const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server); // Aplicação recebe tanto aplicações http quanto websocket

const connectedUsers = {};

io.on('connection', socket => {
	const { user } = socket.handshake.query;

	connectedUsers[user] = socket.id;
});	// Pega o id de todo cliente que se conecta com o backend

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-phftt.mongodb.net/omnistack8?retryWrites=true&w=majority', {
	useNewUrlParser: true
});

app.use((req, res, next) => {
	req.io = io;
	req.connectedUsers = connectedUsers;

	return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
