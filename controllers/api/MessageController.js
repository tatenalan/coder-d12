const Message = require("../../models/Message");

const getMessages = async (req, res) => {
    try {
        const messages = await Message.find()
        console.log(messages);
        res.send(messages)
    } catch (error) {
        throw new Error(`Error, can't get messages: ${error}`)
    }
}

const getMessage = async (req, res) => {
    try {
        const id = req.params.id
        const message = await Message.find({ _id: id })
        res.send(message)
    } catch (error) {
        throw new Error(`Error, can't get message: ${error}`)
    }
}

const insertMessage = async (req, res) => {
    try {

        // alternativa 1
        res.send(await Message.create(req.body))
        
        // alternativa 2
        // const message = new Message(req.body)
        // const result = await message.save()
        // res.send(result)
    } catch (error) {
        throw new Error(`Error, can't save: ${error}`)
    }
}

const updateMessage = async (req, res) => {
    try {
        const id = req.params.id
        const message = await Message.updateOne({_id: id},{$set: req.body})
        res.send(message)
    } catch (error) {
        throw new Error(`Error, can't save: ${error}`)
    }
}

const deleteMessage = async (req, res) => {
    try {
        const id = req.params.id
        const result = await Message.deleteOne({_id: id})
        res.send(result)
    } catch (error) {
        throw new Error(`Error, can't delete: ${error}`)  
    }
}

const deleteAll = async (req, res) => {
    try {
        const result = await Message.deleteMany({})
        res.send(result)
    } catch (error) {
        throw new Error(`Error, can't delete all: ${error}`)  
    }
}


module.exports = { getMessages, getMessage, insertMessage, updateMessage, deleteMessage, deleteAll }