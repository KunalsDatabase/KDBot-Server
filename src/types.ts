import { Request } from 'express'
import { UserSession } from './database/entities/UserSession'
export type tokenData = {
    access_token: string
    token_type: string
    expires_in: number
    refresh_token: string
    scope: string
}
export type formData = {
    client_id:string,
    client_secret:string,
    grant_type: string,
    code: string,
    redirect_uri: string,
    scope:string
}
declare global {
    namespace Express {
      interface Request {
        session: UserSession
      }
    }
  }
