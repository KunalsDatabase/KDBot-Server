import express from 'express'
import { getAggregateBotInfo, getAggregateMemoryInfo } from '../controllers/aggregateController'

const router = express.Router()

router.get('/botinfo', getAggregateBotInfo)
router.get('/memory', getAggregateMemoryInfo)

export default router