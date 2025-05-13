import express from 'express'
import { registerUser, loginUser } from '../controllers/authController.js'

const router = express.Router()

// setting up the route to register a new user
router.post('/register', registerUser)

// setting up the route to login an existing user
router.post('/login', loginUser)

export default router
