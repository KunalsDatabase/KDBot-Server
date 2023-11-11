import {Request,Response, NextFunction } from 'express'
import {getSession} from '../services/sessionService'
export const sessionValidation = (req:Request, res:Response, next:NextFunction) => {
    const sessionId = req.cookies?.sessionId
    if(!sessionId){
        return res.status(401).json({error:"Unauthorized"})
    }
    getSession(sessionId).then((sessionData)=>{
        if(!sessionData){
            return res.status(401).json({error:"Unauthorized"})
        }
        req.session = sessionData
        next()
    })
  }