import User from '../models/User.js'
import jwt from 'jsonwebtoken'

// helper function to create jwt tokens
const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '3d' })
}

// handling registration for a new user 
export const registerUser = async (req, res) => {
  const { username, password } = req.body

  try {
    // before trying to create the user in MongoDB
    // adding basic validation to prevent blank usernames or weak passwords
    // this keeps the database clean and secure
    if (!username || username.trim() === '') {
      return res.status(400).json({ error: 'username is required' })
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'password must be at least 6 characters' })
    }

    // checking if someone already took this username
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ error: 'username already exists' })
    }

    // creating and saving the user with hashed password (this happens in the User model)
    const user = await User.create({ username, password })

    // making a jwt token for the user so they can stay logged in
    const token = createToken(user._id)

    res.status(201).json({ message: 'user created', token })
  } catch (err) {
    // if anything breaks.. i am letting the user know registration failed
    res.status(400).json({ error: 'registration failed' })
  }
}

// handling user login
export const loginUser = async (req, res) => {
  const { username, password } = req.body

  try {
    // checking if the username exists
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(404).json({ error: 'user not found' })
    }

    // comparing the entered password with the hashed password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ error: 'invalid credentials' })
    }

    // login successful - issuing a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' })

    res.status(200).json({ message: 'login successful', token })
  } catch (err) {
    res.status(400).json({ error: 'login failed' })
  }
}
