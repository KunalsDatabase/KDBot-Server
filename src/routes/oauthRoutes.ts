import express from 'express'
import {sessionValidation} from '../middlewares/sessionValidation'
import {callback,logout,logoutAll} from '../controllers/oauthController'

const router = express.Router()

router.get('/callback', callback)
router.use(sessionValidation)
router.get('/logout', logout)
router.get('/logoutAll', logoutAll)


export default router