import express from 'express'
import {getUser} from '../controllers/discordController'
import {sessionValidation} from '../middlewares/sessionValidation'
const router = express.Router()
router.use(sessionValidation)
router.get('/getUser', getUser)

export default router