import { Socket } from 'net'

const fetchDataFromSockets = (msg:string,host:string,port:number): Promise<string> => {
    return new Promise((resolve, reject) => {
        const socket = new Socket()
        let buffer = ""
        socket.connect(port, host, () => {
            socket.write(msg)
        })
        
        socket.on('data', (data) => {
            buffer+=data.toString()
            if(data.toString().slice(-1)!="}") return
            socket.destroy()
            resolve(buffer)
        })
        
        socket.on('error', (err) => {
            reject(err)
        })
    })
}

export default fetchDataFromSockets
  