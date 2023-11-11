import { Request, Response } from 'express'
import { updateSession } from '../services/sessionService'
import axios from 'axios'


export const getUser =  (req: Request, res: Response) => {
  axios.get('https://discord.com/api/oauth2/@me', {
    headers: {
      Authorization: `Bearer ${req.session.accessToken}`
    }
  })
  .then((response)=>{
    req.session.userId = response.data.user.id
    updateSession(req.session)
    return res.json(response.data.user)
  })
  .catch((err)=>{
    console.log(err)
    return res.status(500).json({ error: 'Failed to fetch user' })
  })
}
