import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import journalRoutes from './routes/journalRoutes.js'
import connectDB from './config/db.js'

connectDB()

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


app.use('/api/journal', journalRoutes)

app.get('/', (req, res) => {
  res.send('Welcome to RiseKit API')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

