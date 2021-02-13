const { Router } = require('express')
const UserController = require('./apps/controllers/UserController')
const MessageController = require('./apps/controllers/MessageController')

const routes = new Router();

routes.get('/health', (req, res) => {
    return res.send({ message: 'Connected with sucess!' })
})

routes.post('/user', UserController.insert)
routes.get('/user/:email', UserController.getUser)
routes.get('/users', UserController.getAllUsers)

routes.post('/message', MessageController.sendMessage)
routes.get('/messages/:userId/:myId', MessageController.listAllMessages)





module.exports = routes