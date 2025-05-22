import express from 'express'; // Framework de infraestrucuta web para crear el servidor
import logger from 'morgan'; // logger para registrar las peticiones HTTP

import { Server } from 'socket.io'; // Importo el Server de socket.io
import { createServer } from 'node:http'; // Importo el createServer de node:http

const port = process.env.PORT || 3000;

const app = express();
const server = createServer(app); // Creo un servidor HTTP gracias a la app de express

// Creo un servidor WebSocket (io -> in-out) gracias al servidor HTTP
// Le añado la opción connectionStateRecovery para que los usuarios puedan reconectarse -
// después de una desconexión y recuperen los mensajes que se hayan enviado en ese tiempo
const io = new Server(server, {
    connectionStateRecovery: {
        maxDisconnectionDuration: 60 * 1000, // Duración máxima de desconexión
    }
})

io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });

  socket.on('chat message', (msg) => {
    console.log('Mensaje recibido: ' + msg);
    io.emit('chat message', msg); // Con esto emito el mensaje a todos los usuarios conectados
  });
})

app.use(logger('dev'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html'); // Servir el HTML file desde el current working directory
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});