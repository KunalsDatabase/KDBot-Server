import { Request, Response } from 'express'
import dotenv from 'dotenv'
import axios from 'axios'
import {getSession, createSession,deleteSession} from '../services/sessionService'
import {tokenData,formData} from '../types'
dotenv.config()

export const callback = async (req: Request, res: Response) => {
  let code = req.query.code
  if(!code) return res.status(400).json({ error: 'No code provided' })
  
  const tokenURL = process.env.TOKEN_URL as string
  const formdata:formData = {
    client_id: process.env.CLIENT_ID as string,
    client_secret: process.env.CLIENT_SECRET as string,
    grant_type: process.env.GRANT_TYPE as string,
    code: code.toString(),
    redirect_uri: process.env.REDIRECT_URI as string,
    scope: process.env.SCOPE as string
  }

  try {
    const response = await axios.post(tokenURL, new URLSearchParams(formdata), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    const tokenData:tokenData = response.data
 
    const sessionId:string|false = await createSession(tokenData)
    if(!sessionId) return res.status(500).json({ error: 'Failed to create session' })
    res.cookie('sessionId', sessionId, { httpOnly: true, secure: true, sameSite: 'strict' })
    res.redirect(process.env.APPLICATION_URI as string)
  } 
  catch (error:any) {
    console.error('Error fetching token:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch token' });
  }
}
export const logout = (req: Request, res: Response) => {
    res.clearCookie('sessionId')
    deleteSession(req.cookies.sessionId)
    res.redirect(process.env.APPLICATION_URI as string)

}
export const logoutAll = (req: Request, res: Response) => {
  res.clearCookie('sessionId')
  deleteSession(req.cookies.sessionId,req.session.userId)
  res.redirect(process.env.APPLICATION_URI as string)

}

