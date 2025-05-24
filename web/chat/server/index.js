// server.js

import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import { createClient} from '@libsql/client';

import { Server } from 'socket.io';
import { createServer } from 'node:http';
import fetch from 'node-fetch'; // Asegúrate de que node-fetch esté instalado (npm install node-fetch@2)

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
const server = createServer(app);

const io = new Server(server, {
    connectionStateRecovery: {
        connectionStateRecovery: true,
        maxDisconnectionDuration: 60 * 1000,
    }
})

const db = createClient({
  url: process.env.TURSO_DB_URL,
  authToken: process.env.DB_TOKEN
});

await db.execute(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    user TEXT
  );
`);

// NUEVA RUTA para obtener un nombre de usuario de API-Ninjas
app.get('/get-random-username', async (req, res) => {
    try {
        const apiKey = process.env.API_NINJAS_KEY;
        if (!apiKey) {
            console.error('API_NINJAS_KEY no está definida en .env');
            return res.status(500).json({ error: 'La clave de la API no está configurada en el servidor.' });
        }
        // Realización de la solicitud a la API de API-Ninjas para obtener un nombre de usuario
        const apiNinjasRes = await fetch('https://api.api-ninjas.com/v1/username', {
            headers: {
                'X-Api-Key': apiKey
            }
        });

        if (!apiNinjasRes.ok) {
            // Si la respuesta no es 200 OK, lee el texto del error
            const errorText = await apiNinjasRes.text();
            console.error(`Error de API-Ninjas: ${apiNinjasRes.status} - ${errorText}`);
            return res.status(apiNinjasRes.status).json({ error: 'No se pudo obtener el nombre de usuario de API-Ninjas.' });
        }

        const data = await apiNinjasRes.json();
        // La API de 'username' de API-Ninjas devuelve un array con un objeto que tiene la propiedad 'username'
        // Ejemplo: [{"username": "luckybird5"}]
        if (data && data.length > 0 && data[0].username) {
            res.json({ username: data[0].username });
        } else {
            console.error('Formato de respuesta inesperado de API-Ninjas:', data);
            res.status(500).json({ error: 'Formato de nombre de usuario inesperado de API-Ninjas.' });
        }

    } catch (error) {
        console.error('Error al proxy la solicitud de nombre de usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener el nombre de usuario.' });
    }
});


io.on('connection', async (socket) => {
  console.log('Un usuario se ha conectado');

  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });

  socket.on('chat message', async (msg) => {
    let result 
    let username = socket.handshake.auth.username ?? 'Anónimo'; 
    try {

      result = await db.execute({
        sql: 'INSERT INTO messages (content, user) VALUES (:msg, :username)',
        args: { msg, username }
      })
    } catch (e){
      console.error(e);
      return; 
    }

    io.emit('chat message', msg, result.lastInsertRowid.toString(), username); 
  });

  if(!socket.recovered){
    try {
      const results = await db.execute({
        sql: 'SELECT id, content, user FROM messages WHERE id > ?',
        args: [socket.handshake.auth.serverOffset ?? 0]
      })

      results.rows.forEach(row => {
        socket.emit('chat message', row.content, row.id.toString(), row.user);
      });
    } catch (e) {
      console.error(e);
      return;
    }
  }
})

app.use(logger('dev'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html'); 
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});