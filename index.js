const express = require('express')
const app = express()
const { createServer } = require('http')
const { Server } =require('socket.io') 
const uuid = require('uuid')

const httpServer = createServer(app)
const io = new Server(httpServer, {/*options */})
const bodyParser = require('body-parser')
//var socket = io.connect();



app.set('view engine', 'ejs')
app.use("/static", express.static("public"))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))
const port = 3000

app.get('/', (req, res) => {
  io.sockets.emit('create', req.query.roomId)
  res.render('pages/index')
})

app.get('/chat', (req, res)=>{
  res.render('pages/chat')
})

app.get('/generate-room-id', (req, res) =>{
  let roomId = uuid.v4()
  res.status(200).send({"roomId":roomId})
})

io.on('connection', (socket)=>{
    //join socket to the room, handle emit message from client
    socket.on('join-room', (name, roomId)=>{
      socket.join(roomId);
      //emit a message that user has joined the room from server
    io.to(roomId).emit("user-connected", name)
    })
    //handle the message sent from client side
    socket.on("message",(name, roomId, message)=>{
      //emit that message was received
      io.to(roomId).emit("receive-msg", name, message);
    })

    
})

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})