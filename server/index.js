import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(
  cors({
    origin: "*",
  })
);

const user = false;

// middleware

// io.use((socket, next) => {
//   if (user) {
//     next();
//   } else {
//     throw new Error("not authenticated");
//   }
// });

io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  socket.on("message", (data) => {
    console.log(data);
    // socket.broadcast.emit("receive", data); to send the data to everyone
    socket.to(data.room).emit("receive", data);
  });
  socket.on("join", (room) => {
    socket.join(room);
  });
});

app.get("/", (req, res) => {
  res.send("server running");
});

server.listen(3001, () => {
  console.log("server running at 3001");
});
