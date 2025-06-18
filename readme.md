# ChatOn 

A full-stack real-time chat application built using the MERN stack, incorporating JWT authentication and Socket.IO for seamless, secure communication.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)

![image](https://github.com/user-attachments/assets/75ed4a6f-b0d8-4514-b91c-2f2866363c2a)
![image](https://github.com/user-attachments/assets/20f692cd-e8ea-4b14-b399-46c9351bdd4a)
![image](https://github.com/user-attachments/assets/e72b9737-b464-4f99-990b-997aeceaa3ab)
![image](https://github.com/user-attachments/assets/87a3b4e0-5db4-4a57-a00a-dc73432a7666)
![image](https://github.com/user-attachments/assets/afe6309a-6d6e-4830-99f2-c8e1fcdc1926)


## Overview
ChatOn is a scalable chat application that provides a modern user experience with real-time messaging, built on the robust MERN stack. Leveraging JSON Web Tokens (JWT) for secure authentication and Socket.IO for live interactivity, ChatOn delivers an engaging platform for users to connect instantly.

## Features
- **User Authentication:** Secure registration and login supported by JWT.
- **Real-Time Chat:** Instant messaging via Socket.IO.
- **Responsive User Interface:** Interactive front-end built with React.
- **RESTful API:** Clean and organized endpoints for user and chat operations.
- **Scalable Architecture:** Designed to handle growing user bases efficiently.

## Tech Stack
- **Frontend:** React, HTML5, CSS3, [Optional: Redux, Bootstrap]
- **Backend:** Node.js, Express.js, Socket.IO
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Package Management:** npm or yarn

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Omayer111/ChatOn-MERN-JWT-SOCKET.IO.git
   cd ChatOn-MERN-JWT-SOCKET.IO
   ```

2. **Install Server Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Client Dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Setup Environment Variables**
   - Create a `.env` file in both the `server` and `client` directories (if required).
   - Configure environment variables, such as:
     - `JWT_SECRET`
     - `MONGO_URI`
     - `PORT`
     - Any other configuration specific to your setup.

5. **Run the Application**
   - **Server:**
     ```bash
     cd server
     npm start
     ```
   - **Client:**
     ```bash
     cd client
     npm start
     ```

## Usage
Once both the server and client are running, open your web browser and navigate to [http://localhost:3000](http://localhost:3000) (or your specified port). You can register a new account, log in, and start chatting in real-time.

