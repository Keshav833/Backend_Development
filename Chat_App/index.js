const http = require('http');
const path = require('path')
const express = require('express');

const app = express();
const server = http.createServer(app);
const { Server } =  require('socket.io');
const io = new Server(server); 

io.on('connection', (socket)=>{
    console.log('A new user connected', socket.id);
    socket.on('UserMessage',(msg)=>{
        // console.log("Messge from the User :", msg);
        io.emit("message" , msg);
    })

})

// app.use(express.static(path.resolve("./public")));
app.use(express.static(path.join(__dirname, "public")));


app.get('/', (req, res)=>{
    return res.sendFile(__dirname,"public","index.html");
})


server.listen(3000, ()=>{

    console.log("Server is runnign on 3000");
})