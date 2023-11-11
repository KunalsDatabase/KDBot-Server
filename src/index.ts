import express from 'express'
import dotenv from 'dotenv'
import aggregateRoutes from './routes/aggregateRoutes'
import oauthRoutes from './routes/oauthRoutes'
import discordRoutes from './routes/discordRoutes'
import "reflect-metadata"
import {AppDataSource} from './database/connection'
import {initializeCache} from './services/sessionService'
import https from 'https'
import fs from 'fs'
import cookieParser from 'cookie-parser'
dotenv.config()

let app:express.Express|https.Server = express()
app.use((req, res, next) => {
  // Set CORS headers
  res.header('Access-Control-Allow-Origin', 'https://192.168.0.62:3000')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Credentials','true')
  next()
})
app.use(cookieParser())
app.use('/v1', aggregateRoutes)
app.use('/v1', oauthRoutes)
app.use('/v1',discordRoutes)

if(process.env.NODE_ENV === 'development'){
  console.log('Running in development mode')
  const options = {
    key: fs.readFileSync(process.env.KEY_PATH as string),
    cert: fs.readFileSync(process.env.CERT_PATH as string)
  }
  app = https.createServer(options, app)
}

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`The server is running on localhost:${PORT}`)
})

AppDataSource.initialize().then(() => {
  console.log('Database connection established')
  initializeCache()

}
).catch((err) => {
  console.log(err)
})

