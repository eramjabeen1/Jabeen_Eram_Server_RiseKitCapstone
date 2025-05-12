import mongoose from 'mongoose'
import { config } from 'dotenv'
config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log(`connected to ${mongoose.connection.name}`)
  } catch (err) {
    console.error('failed to connect to mongo:', err.message)
    process.exit(1)
  }
}

export default connectDB