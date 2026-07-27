const connectionStatus = document.getElementById("connectionStatus");
const batteryValue = document.getElementById("batteryValue");
const uptimeValue = document.getElementById("uptimeValue");

const jointChart = document.getElementById("jointChart");
const ctx = jointChart.getContext("2d");
const jointLabels = document.getElementById("jointLabels");
const jointNames = ["L1-Hip", "L1-Knee", "L2-Hip", "L2-Knee", "L3-Hip", "L3-Knee", "L4-Hip", "L4-Knee"];

let socket;

function drawJointChart(angles) {
  const width = jointChart.width;
  const height = jointChart.height;
  const barWidth = width / angles.length;

  ctx.clearRect(0, 0, width, height);

  angles.forEach((angle, index) => {
    const x = index * barWidth;

    ctx.strokeStyle = "#2e2e2e";
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 4, 2, barWidth - 8, height - 4);

    const barHeight = (angle / 180) * height;
    const y = height - barHeight;
    ctx.fillStyle = "#ff3b30";
    ctx.fillRect(x + 4, y, barWidth - 8, barHeight);
  });

  updateJointLabels(angles);
}

function updateJointLabels(angles) {
  jointLabels.innerHTML = "";
  angles.forEach((angle, index) => {
    const label = document.createElement("div");
    label.innerHTML = `<span>${jointNames[index]}</span><span class="angle-value">${angle}°</span>`;
    jointLabels.appendChild(label);
  });
}

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
    drawJointChart(data.jointAngles);
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