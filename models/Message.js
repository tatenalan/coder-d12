const mongoose = require('mongoose')
const { Schema } = mongoose


// Usamos un objeto Schema para definir una lista de propiedades del documento/collection.
// Tambien usamos un modelo constructor para poder crear instancias de los documentos/collections.
const Message = mongoose.model('Message', new Schema(
    {
        author: {
            id:String,
            firstName:String,
            lastName:String,
            age: Number,
            alias: String,
            avatar: String,
        },
        date: { type: String, default: new Date().toLocaleString() },
        text: String
    }))

module.exports = Message
