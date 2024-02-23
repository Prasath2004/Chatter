const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const server = http.createServer(app);


app.use(cors());
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });


// const io = new Server(server, {
//     origin: function (origin, callback) {
//         if (!origin || origin === "https://chatter-frontend-phi.vercel.app") {

//             callback(null, true);
//         } else {

//             callback(new Error("Not allowed by CORS"));
//         }
//     },
//     methods: ["GET", "POST"],
//     credentials: true
// });

io.on("connection", (socket) => {
    console.log(`User Connected ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User ${socket.id} is joined in the room ${data}`);
    })
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    })
})

server.listen(8000, () => {
    console.log("Server Running at 8000");
})