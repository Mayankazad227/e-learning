import { Server as SocketIoServer } from "socket.io";
import http from "http";

export const initSocketServer = (server: http.Server) => {
  const allowedOrigins = [
    process.env.FRONTEND_URL as string,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ].filter(Boolean);

  const io = new SocketIoServer(server, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected.");

    // Listen to the "notification" event from frontend
    socket.on("notification", (data: any) => {
      // boradcast the new notification data to all clients connected (admin dashboard)
      io.emit("newNotification", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected.");
    });
  });
};
