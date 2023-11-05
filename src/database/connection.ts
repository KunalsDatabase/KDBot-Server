import mysql from 'mysql2/promise'
import {DataSource} from 'typeorm'
import {UserSession} from './entities/UserSession'
import { config } from 'dotenv'
config()

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,  
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  cache: {
    duration: 60000
  },
  entities: [UserSession],
  subscribers: [],
  migrations: [],
})
