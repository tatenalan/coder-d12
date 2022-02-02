const Message = require("../../models/Message");
const { normalice, denormalice } = require("../../normalizer/messageNormalizer")

const getAll = async (req, res) => {
    try {
        const messages = await Message.find().lean()
        normalice(messages)
        res.render('messagesTest', {messages});
    } catch (error) {
        throw new Error(`Error, can't get messages: ${error}`)
    }
}

const insertMessage = async (req, res) => {
    try {
        // alternativa 1
        // return(req.body);
        return normalice(req.body)
        return(messages);
        // await Message.create(messages)
    } catch (error) {
        throw new Error(`Error, can't save: ${error}`)
    }
}

module.exports = { getAll, insertMessage }