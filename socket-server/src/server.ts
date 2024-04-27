import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import { socket_room_table, socket_user_table } from "./tables";
import { Message } from "./Message";
import { Room } from "./Room";

const app = express();
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(cors);

io.on("connection", (socket) => {
  const socketId = socket.id;
  console.log("+ socketId: ", socketId);

  socket.on("createRoom", ({ userId }, sendResponse) => {
    const room = new Room({ ownerId: userId });

    Room.joinUser(room.id, userId, socket);
    sendResponse({ roomId: room.id });
  });

  socket.on("joinRoom", ({ userId, roomId }, sendResponse) => {
    const room = Room.joinUser(roomId, userId, socket);
    if ("error" in room) return sendResponse({ error: room.error });
    sendResponse({ data: room.data });
  });

  socket.on("message", ({ userId, roomId, text }) => {
    const message = new Message({ text, roomId, authorId: userId });
    io.to(roomId).emit("message", message);
  });

  socket.on("disconnect", (reason) => {
    console.log(`- socketId: `, socketId);
    const userId = socket_user_table[socket.id];
    const roomId = socket_room_table[socketId];
    Room.kickUser(roomId, userId, socket);
    delete socket_user_table[socket.id];
    delete socket_room_table[socketId];
  });
});

server.listen(4000, () => {
  console.log("listening on *:4000");
});