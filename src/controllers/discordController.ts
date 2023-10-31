import { Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()

export const getUser =  (req: Request, res: Response) => {
  return res.status(200)
}
