import express from 'express'
import {callback, getUser } from '../controllers/oauthController'

const router = express.Router()

router.get('/callback', callback)
router.get('/getUser', getUser)

export default router