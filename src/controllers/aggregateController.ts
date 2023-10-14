import { Request, Response } from 'express'
import fetchDatafromSockets from '../services/socketService'
import dotenv from 'dotenv'
dotenv.config()
const clusters = JSON.parse(process.env.CLUSTERS || '[]')
async function respondWithData(msg:string){
  let result = {}
  for(let i=0;i<clusters.length;i++){
    try{
    let newData = await fetchDatafromSockets(msg,clusters[i].host,clusters[i].port)
    result= {...result,...JSON.parse(newData)}
    }
    catch(err){
      console.log(err)
      continue
    }
  }
  return result
}
let botData = {}
let memoryData = {}
function getDataEveryInterval(msg:string,data:Object,interval:number){
  setInterval(async ()=>{
    const newData = await respondWithData(msg);
    Object.assign(data, newData)
  },interval)
}
getDataEveryInterval('all_data',botData,5000)
getDataEveryInterval('memory_usage',memoryData,5000)

export const getAggregateBotInfo = (req: Request, res: Response) => {
  return res.status(200).json(botData)
}

export const getAggregateMemoryInfo =  (req: Request, res: Response) => {
  return res.status(200).json(memoryData)
}

