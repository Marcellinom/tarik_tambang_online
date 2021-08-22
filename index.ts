import express from 'express';
import fs from 'fs';
const app = express();
import server from 'http';
import { Server } from 'socket.io';
const newServer = server.createServer(app);
const io = new Server(newServer);
const PORT = 3000;

newServer.listen(PORT, () => console.log(`http://localhost:${PORT}`));
app.set('view engine', 'ejs');
app.get('/jquery/jquery.js', function(req, res) {
    res.sendFile(__dirname + '/node_modules/jquery/dist/jquery.min.js');
});
const files = fs.readdirSync('style');
files.forEach(f => {
    app.get(`/style/${f}`, function(req, res) {
        res.sendFile(__dirname + `/style/${f}`);
    });
})
app.get('/', (req,res) => {
    res.render('index');
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('tarik', () => {
        socket.emit('left');
        socket.broadcast.emit('right');
    })
})
