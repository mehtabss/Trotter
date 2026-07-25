const connectionStatus = document.getElementById("connectionStatus");
const batteryValue = document.getElementById("batteryValue");
const uptimeValue = document.getElementById("uptimeValue");

let socket;

function connect() {
  socket = new WebSocket("ws://localhost:3000");

  socket.onopen = () => {
    connectionStatus.textContent = "Connected";
    connectionStatus.style.color = "var(--accent)";
    connectionStatus.style.borderColor = "var(--accent)";
  };

  socket.onclose = () => {
    connectionStatus.textContent = "Disconnected, retrying...";
    connectionStatus.style.color = "";
    connectionStatus.style.borderColor = "";
    setTimeout(connect, 2000);
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    batteryValue.textContent = data.battery;
    uptimeValue.textContent = data.uptimeSeconds;
  };
}

connect();

document.getElementById("forwardButton").addEventListener("click", () => {
  const command = { type: "command", action: "forward", speed: 0.5 };
  socket.send(JSON.stringify(command));
});

document.getElementById("backwardButton").addEventListener("click", () => {
  const command = { type: "command", action: "backward", speed: 0.5 };
  socket.send(JSON.stringify(command));
});

document.getElementById("leftButton").addEventListener("click", () => {
  const command = { type: "command", action: "left", speed: 0.5 };
  socket.send(JSON.stringify(command));
});

document.getElementById("rightButton").addEventListener("click", () => {
  const command = { type: "command", action: "right", speed: 0.5 };
  socket.send(JSON.stringify(command));
});

document.getElementById("stopButton").addEventListener("click", () => {
  const command = { type: "command", action: "stop" };
  socket.send(JSON.stringify(command));
});