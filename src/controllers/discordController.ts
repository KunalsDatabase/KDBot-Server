import { Request, Response } from 'express'
import dotenv from 'dotenv'
import axios from 'axios'
dotenv.config()

export const getUser =  (req: Request, res: Response) => {
  axios.get('https://discord.com/api/oauth2/@me', {
    headers: {
      Authorization: `Bearer ${req.accessToken}`
    }
  })
  .then((response)=>{
    return res.json(response.data.user)
  })
  .catch((err)=>{
    console.log(err)
    return res.status(500).json({ error: 'Failed to fetch user' })
  })
}
