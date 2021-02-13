require('./database')
const routes = require('./routes')

const express = require('express')
const app = express();
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(routes)

const server = require('http').Server(app)
const io = require('socket.io')(server)
app.request.io = io

server.listen(5000)