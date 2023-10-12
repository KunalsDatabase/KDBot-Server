import { Request, Response } from 'express'
import fetchDatafromSockets from '../services/socketService'

export const getAggregateBotInfo = (req: Request, res: Response) => {
  const result = fetchDatafromSockets('test','localhost',3000)
  res.send(result)
}

export const getAggregateMemoryInfo = (req: Request, res: Response) => {
  const result = fetchDatafromSockets('test','localhost',3000)
  res.send(result)
}