import { AppDataSource } from '../database/connection'
import { UserSession } from '../database/entities/UserSession'
import {Repository} from 'typeorm'
import {tokenData} from '../types'
import { randomUUID } from 'crypto'
let sessionRepository:Repository<UserSession>
let sessionCache = new Map<string, UserSession>()
export const initializeCache = async () => {
    sessionRepository = AppDataSource.getRepository(UserSession)
    const sessions = await sessionRepository.find()
    sessions.forEach(session => {
        sessionCache.set(session.sessionId, session)
    })

}


export const getSession = async (id:string):Promise<UserSession|null> => {
    let session:UserSession|undefined|null = sessionCache.get(id)
    if(session) return session
    try {
        session = await sessionRepository.findOne({ where: { sessionId: id } })
        if (session) {
            sessionCache.set(session.sessionId, session)
            return session

        }
        return null
    } catch (err) {
        console.log(err)
        return null
    }
}
export const createSession = async (session:tokenData):Promise<string|false> => {
    try {
        const userSession = new UserSession()
        userSession.accessToken = session.access_token
        userSession.accessTokenExpiry = new Date(Date.now() + session.expires_in)
        userSession.createdAt = new Date()
        userSession.lastLogin = new Date()
        userSession.sessionId = randomUUID()
        userSession.refreshToken = session.refresh_token
        userSession.sessionExpiry =  new Date(Date.now() + session.expires_in*4)
        await sessionRepository.save(userSession)
        sessionCache.set(userSession.sessionId, userSession)
        return userSession.sessionId
    } catch (err) {
        console.log(err)
        return false
    }
}



export const deleteSession = async (sessionId:string,userId:string|null=null) => {
    sessionCache.delete(sessionId)
    return await sessionRepository.delete(userId?{userId:userId}:{sessionId:sessionId})
}
export const updateSession = async (session:UserSession) => {
    sessionCache.set(session.sessionId, session)
    return await sessionRepository.save(session)
}
