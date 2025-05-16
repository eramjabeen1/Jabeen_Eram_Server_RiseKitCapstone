# RiseKit (Backend/Server side)

## Client side/Frontend Repo Link 
[https://github.com/eramjabeen1/Jabeen_Eram_Server_RiseKitCapstone.git](https://github.com/eramjabeen1/jabeen_eram_client_risekitcapstone.git)

---

## Overview

This is the backend Express server and API for RiseKit, a wellness and journaling dashboard built to support developers especially parents in tech, career switchers, late starters, career returners, and emotionally overwhelmed tech learners.
The server handles user authentication, journal entry storage, and all backend CRUD operations. It connects to a MongoDB Atlas database and serves a RESTful API consumed by the React frontend.


---
## Core Features
RESTful API endpoints for:
Creating, reading, updating, deleting journal entries
Optional JWT authentication
Token stored in localStorage on frontend
Middleware for protected routes
Seed route for starter test data
testMode toggle in frontend allows bypassing auth for local testing

---
## Tech Stack
Node.js
Express
MongoDB (Atlas)
Mongoose
dotenv for environment configuration
JWT for authentication (can be toggled off for test mode)

---
## API Endpoints
GET
/api/journal
Get all journal entries for user

POST
/api/journal
Create a new journal entry

PUT
/api/journal/:id
Update an entry by ID

DELETE
/api/journal/:id
Delete an entry by ID

GET
/api/journal/seed
Add test entries (non-auth)

Auth endpoints:
POST
/api/auth/register
Register new use

POST
/api/auth/login
Login and get JWT token

---
## Setup Instructions
1. Clone this repo: https://github.com/eramjabeen1/Jabeen_Eram_Server_RiseKitCapstone.git
2. Install dependencies:npm install
3. Create a .env file: PORT=5000 MONGO_URI=your-mongodb-atlas-url
  JWT_SECRET=your-secret
4. Start the server: npm run dev
---

## Database Schema
{
  title: String,
  text: String,
  mood: String,
  imposterScore: Number,
  imposterPlan: String,
  isPrivate: Boolean,
  user: ObjectId (ref: 'User'),
  timestamps: true
}

User
{
  username: String,
  password: String (hashed)
}

---

## Current Status
Full CRUD working for /api/journal
Auth integrated and functional via middleware
Seed data available for development without login
Testing is in progress for edge cases and updates

---
## Screenshots - coming up 
---
##Developer Reflection

In the early stages of this project, I chose to implement JWT authentication to simulate a more realistic full-stack experience. I was a bit familiar of JWT but felt unclear about how to apply across frontend and backend. Through building this capstone, I had to debug token storage, middleware protection, and authorization header logic—especially while testing with Postman and switching to frontend Axios calls.
Eventually, I realized the added complexity of token management was slowing down feature delivery. To balance realism with development speed, I created a testMode toggle that allows bypassing auth headers during local testing. This helped me move forward while keeping the original secure logic intact. I now understand how JWTs integrate with protected routes and how to gracefully build fallback logic when user auth isn’t the priority yet.

This experience made me a stronger backend problem solver and helped me think more critically about developer UX on both sides of the stack.
---
