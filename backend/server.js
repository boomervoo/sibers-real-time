import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const chatRooms = [
  {
    id: crypto.randomUUID(),
    name: "Болталка",
    creator: "BOOMER",
    users: ["BOMBAS", "Noiko", "Yura"],
  },
  {
    id: crypto.randomUUID(),
    name: "Разговоры о разном",
    creator: "BOOMER",
    users: ["suba", "templyyfor", "ALEX54RUS", "Tanyshka"],
  },
  {
    id: crypto.randomUUID(),
    name: "История",
    creator: "Suba",
    users: [, "Ириша", "Юрец", "Мальвина"],
  },
  {
    id: crypto.randomUUID(),
    name: "Автолюбители",
    creator: "AutoMachine",
    users: ["Чума", "плиточник", "Ярик", "Гадзила"],
  },
];

const messages = {
  1: [],
  2: [],
};

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  const username = socket.handshake.query.username;

  socket.emit("roomlist", chatRooms);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    const room = chatRooms.find((r) => r.id === roomId);
    if (room && !room.users.includes(username)) {
      room.users.push(username);
    }

    io.emit("roomlist", chatRooms);
    socket.emit("history messages", messages[roomId] || []);
  });

  socket.on("leaveRoom", (roomId) => {
    const room = chatRooms.find((r) => r.id === roomId);
    if (room) {
      room.users = room.users.filter((u) => u !== username);
    }

    socket.leave(roomId);

    io.emit("roomlist", chatRooms);
  });

  socket.on("sendMessage", ({ roomId, text, username }) => {
    const msg = {
      id: crypto.randomUUID(),
      text,
      username,
      roomId,
      time: new Date().toISOString(),
    };

    if (!messages[roomId]) {
      messages[roomId] = [];
    }

    messages[roomId].push(msg);

    io.to(roomId).emit("newMessage", msg);
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("addRoom", (name) => {
    const newRoom = {
      id: crypto.randomUUID(),
      name,
      users: [],
      creator: username,
    };
    chatRooms.push(newRoom);

    io.emit("roomlist", chatRooms);
  });

  socket.on("deleteUser", ({ removeUser, roomId }) => {
    const room = chatRooms.find((r) => r.id === roomId);

    if (!room) return;

    room.users = room.users.filter((u) => u !== removeUser);

    io.emit("roomlist", chatRooms);
  });

  socket.on("disconnect", () => {
    console.log(`юзер отключен: ${username}`);
  });
});

server.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
