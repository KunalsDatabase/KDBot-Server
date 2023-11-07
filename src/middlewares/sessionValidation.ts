import {Request,Response, NextFunction } from 'express'
import {getSession} from '../services/sessionService'
export const sessionValidation = (req:Request, res:Response, next:NextFunction) => {
    const sessionId = req.cookies?.sessionId
    console.log(req.cookies)
    if(!sessionId){
        return res.status(401).json({error:"Unauthorized"})
    }
    getSession(sessionId).then((sessionData)=>{
        if(!sessionData){
            return res.status(401).json({error:"Unauthorized"})
        }
        req.accessToken = sessionData.accessToken
        next()
    })
  }