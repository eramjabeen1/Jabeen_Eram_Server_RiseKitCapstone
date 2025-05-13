// middleware/authMiddleware.js
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers

  // i am checking if the auth header is present
  if (!authorization) {
    return res.status(401).json({ error: 'authorization token required' })
  }

  // i am extracting the token from the "Bearer tokenstring"
  const token = authorization.split(' ')[1]

  try {
    // i am verifying the token using the secret key
    const { id } = jwt.verify(token, process.env.JWT_SECRET)

    // i am attaching the user id to the request
    req.user = await User.findById(id).select('_id')

    next()
  } catch (error) {
    res.status(401).json({ error: 'request is not authorized' })
  }
}

export default requireAuth
