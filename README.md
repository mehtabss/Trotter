# Trotter 🐾
 
An open-source, 3D-printed walking quadruped robot. Built with a custom frame, ESP32-based firmware, and a self-hosted web dashboard for real-time control and telemetry.
 
Trotter is a personal engineering project combining mechanical design, embedded firmware, and full-stack web development into one system: a four-legged robot you can drive and monitor live from a browser.
 
---
 
## Overview
 
- **Custom 3D-printed frame**: designed from scratch, printed on a Creality Centauri Carbon 2
- **8x MG90S servos**: two per leg (hip and knee), driving the walking gait
- **Lolin S2 Mini (ESP32-S2)**: onboard microcontroller, WiFi-enabled, handles servo control and communicates with the web dashboard
- **0.96" SSD1306 OLED display**: onboard status display
- **Self-hosted web dashboard**: a browser-based controller and live telemetry viewer, built with Node.js, WebSockets, and vanilla JS
- **All 3D printed parts made using the Centauri Carbon 2 Combo  
---
 
## Inspiration
 
Trotter's electronics (Lolin S2 Mini, MG90 servos, OLED display) are based on the open-source [Sesame Robot Project](https://github.com/dorianborian/sesame-robot) by Dorian Todd. The frame design, firmware, gait logic, and web dashboard in this repo are original work built from scratch.
 
## Author
 
Built by [Mehtab Sidhu](https://github.com/mehtabss), engineering student @ University of British Columbia.
 
