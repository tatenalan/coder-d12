const normalizr = require("normalizr")
const { denormalize, normalize, schema } = normalizr
const util = require('util')

// creo los schemas
const authorSchema = new schema.Entity('author')
const messageSchema = new schema.Entity('message', { author: authorSchema }, {idAttribute: '_id'})

let normalice = (messages) => {
    let normalizedMessages = normalize(messages, [messageSchema])
    console.log(util.inspect(normalizedMessages, false, 12, true))
}

let denormalice = (messages) => {
    let normalizedMessages = denormalize(messages, [messageSchema])
    console.log(util.inspect(normalizedMessages, false, 12, true))
}

module.exports = { normalice, denormalice }
