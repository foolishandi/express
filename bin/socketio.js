const {Server} =require('socket.io')
function start(http){
    const io=new Server(http,{
        cors:{
            origin:'*',
            allowedHeaders:['AUth'],
            credentials:true
        }
    })

    io.on('connection',(socket)=>{
        socket.on('start',msg=>{
            io.emit('start','socket start!')
            console.log('socket start!')
        })
    })
}

exports.start=start