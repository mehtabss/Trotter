// WebSocket server relays fake sensor data to the browser

const { WebSocketServer } = require("ws");

const PORT = 3000;
const wss = new WebSocketServer({ port: PORT });

console.log(`WebSocket server running on ws://localhost:${PORT}`);

wss.on("connection", (ws) => {
  console.log("A client connected");

  ws.on("message", (rawMessage) => {
    const command = JSON.parse(rawMessage);
    console.log("Received command from browser:", command);
  });

  ws.on("close", () => {
    console.log("A client disconnected");
  });
});

function randomAngle() {
  return Math.floor(Math.random() * 180);
}

function randomBattery() {
  return (7.4 - Math.random() * 0.5).toFixed(2);
}

function generateFakeTelemetry() {
  return {
    type: "telemetry",
    timestamp: Date.now(),
    jointAngles: [
      randomAngle(), randomAngle(),
      randomAngle(), randomAngle(),
      randomAngle(), randomAngle(),
      randomAngle(), randomAngle(),
    ],
    battery: randomBattery(),
    uptimeSeconds: Math.floor(process.uptime())
  };
}

setInterval(() => {
  const data = generateFakeTelemetry();
  const message = JSON.stringify(data);

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(message);
    }
  });
}, 1000);