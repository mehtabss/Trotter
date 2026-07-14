const socket = new WebSocket("ws://localhost:3000");

const connectionStatus = document.getElementById("connectionStatus");
const batteryValue = document.getElementById("batteryValue");
const uptimeValue = document.getElementById("uptimeValue");

socket.onopen = () => {
  connectionStatus.textContent = "Connected";
};

socket.onclose = () => {
  connectionStatus.textContent = "Disconnected";
  connectionStatus.style.color = "var(--accent)";
  connectionStatus.style.borderColor = "var(--accent)";
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  batteryValue.textContent = data.battery;
  uptimeValue.textContent = data.uptimeSeconds;
};

document.getElementById("forwardButton").addEventListener("click", () => {
  const command = { type: "command", action: "forward", speed: 0.5 };
  socket.send(JSON.stringify(command));
});

document.getElementById("stopButton").addEventListener("click", () => {
  const command = { type: "command", action: "stop" };
  socket.send(JSON.stringify(command));
});