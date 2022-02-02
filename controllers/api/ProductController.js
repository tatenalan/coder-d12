const Product = require("../../models/Product");

const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.send(products)
    } catch (error) {
        throw new Error(`Error, can't get products: ${error}`)
    }
}

const getProduct = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.find({ _id: id })
        res.send(product)
    } catch (error) {
        throw new Error(`Error, can't get product: ${error}`)
    }
}

const insertProduct = async (req, res) => {
    try {

        // alternativa 1
        res.send(await Product.create(req.body))
        
        // alternativa 2
        // const product = new Product(req.body)
        // const result = await product.save()
        // res.send(result)
    } catch (error) {
        throw new Error(`Error, can't save: ${error}`)
    }
}

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.updateOne({_id: id},{$set: req.body})
        res.send(product)
    } catch (error) {
        throw new Error(`Error, can't save: ${error}`)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        const result = await Product.deleteOne({_id: id})
        res.send(result)
    } catch (error) {
        throw new Error(`Error, can't delete: ${error}`)  
    }
}

const deleteAll = async (req, res) => {
    try {
        const result = await Product.deleteMany({})
        res.send(result)
    } catch (error) {
        throw new Error(`Error, can't delete all: ${error}`)  
    }
}


module.exports = { getProducts, getProduct, insertProduct, updateProduct, deleteProduct, deleteAll }