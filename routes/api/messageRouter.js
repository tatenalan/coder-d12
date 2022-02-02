const express = require("express")
const { Router } = express;
const MessageController = require("../../controllers/api/MessageController")
const MessageFactory = require("../../factories/MessageFactory")

const messageRouter = Router()

messageRouter.get('/', MessageController.getMessages)
messageRouter.get('/message-test', MessageFactory.createFakers)
messageRouter.get('/:id', MessageController.getMessage)
messageRouter.post('/', MessageController.insertMessage)
messageRouter.put('/:id', MessageController.updateMessage)
messageRouter.delete('/:id', MessageController.deleteMessage)
messageRouter.delete('/', MessageController.deleteAll)

module.exports = messageRouter