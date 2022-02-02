const express = require('express')
const { Router } = express;
const MessageController = require("../../controllers/web/MessageController")
const MessageFactory = require("../../factories/MessageFactory")

const messageRouter = Router()

messageRouter.get('/', MessageController.getAll)
messageRouter.get('/messages-test', MessageFactory.createFakers)

module.exports = messageRouter