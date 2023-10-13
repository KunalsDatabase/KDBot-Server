import { Request, Response } from 'express'
import fetchDatafromSockets from '../services/socketService'
import dotenv from 'dotenv'
dotenv.config()
const clusters = JSON.parse(process.env.CLUSTERS || '[]')
async function respondWithData(msg:string,res:Response){
  let result = {}
  try{
    for(let i=0;i<clusters.length;i++){
      let newData = await fetchDatafromSockets(msg,clusters[i].host,clusters[i].port)
      result= {...result,...JSON.parse(newData)}
    }
  }
  catch(err: any){
    console.log(err)
    return res.status(500).send(err)
  }
  res.json(result)
}

export const getAggregateBotInfo = async (req: Request, res: Response) => {
  await respondWithData('all_data',res)
}

export const getAggregateMemoryInfo = async (req: Request, res: Response) => {
  await respondWithData('memory_usage',res)
}
