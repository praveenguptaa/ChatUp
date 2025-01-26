const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const socket = require('socket.io');
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());



mongoose.connect(process.env.MONGO_URL, {
}).then(()=>{
    console.log("DB connection successfull");
    
}).catch((err)=>{
    console.log(err.message);
    
}); 
app.use("/api/auth",userRoutes);
app.use("/api/message",messageRoutes);

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server started at Port ${process.env.PORT}`);
});

const io = socket(server, {
    cors: {
        origin: "beamish-otter-61d5eb.netlify.app",
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;

    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg",(data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    });
});




