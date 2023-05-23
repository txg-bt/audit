const WebSocket = require("ws");
const { pool } = require("../database/database").pool;
require("dotenv").config();

const wss = new WebSocket.Server({ port: 8081 });

wss.on("connection", (ws) => {
  console.log("A client connected.");

  ws.on("message", async (request) => {
    const parsedRequest = JSON.parse(request);

    try {
      await pool.query(
        "INSERT INTO logs (route, statu_code, message, user_id, app_name, timestamp) VALUES ($1, $2, $3, $4, $5)",
        [
          parsedRequest.route,
          parsedRequest.statusCode,
          parsedRequest.message,
          parsedRequest.userId,
          parsedRequest.appName,
          parsedRequest.timestamp,
        ]
      );
    } catch (error) {
      console.error("Error inserting log:", error);
    }
  });

  ws.on("close", () => {
    console.log("A client disconnected.");
  });
});

console.log("WebSocket server is running on port 8080.");
