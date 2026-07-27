// temporary for now to simulate the sensor data from the bot 
// this will be replaced by real data  from the S2 Mini later

function generateFakeTelemetry() {
  return {
    type: "telemetry",
    timestamp: Date.now(),
    jointAngles: [
      randomAngle(), randomAngle(), // leg 1: hip, knee
      randomAngle(), randomAngle(), // leg 2: hip, knee
      randomAngle(), randomAngle(), // leg 3: hip, knee
      randomAngle(), randomAngle(), // leg 4: hip, knee
    ],
    battery: randomBattery(),
    uptimeSeconds: Math.floor(process.uptime())
  };
}

function randomAngle() {
  //the servos move from 0-180 degrees
  return Math.floor(Math.random() * 180);
}

function randomBattery() {
  // 7.4V Li-ion battery (might change this battery later)
  return (7.4 - Math.random() * 0.5).toFixed(2);
}

// Print a fake reading every second (ts just to see it working)
setInterval(() => {
  const data = generateFakeTelemetry();
  console.log(data);
}, 1000);