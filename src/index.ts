import express from 'express'
import dotenv from 'dotenv'
import aggregateRoutes from './routes/aggregateRoutes'
dotenv.config()

const app = express()
const PORT = process.env.PORT
app.use((req, res, next) => {
  // Set CORS headers
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})
app.use('/v1', aggregateRoutes)
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`)
})
