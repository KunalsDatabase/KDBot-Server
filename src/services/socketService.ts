import { Socket } from 'net'

const fetchDataFromSockets = (msg:string,host:string,port:number): Promise<string> => {
    return new Promise((resolve, reject) => {
        const socket = new Socket()
        socket.connect(port, host, () => {
            socket.write(msg)
        })
        
        socket.on('data', (data) => {
            socket.destroy()
            resolve(data.toString())
        })
        
        socket.on('error', (err) => {
            reject(err)
        })
    })
}

export default fetchDataFromSockets
  