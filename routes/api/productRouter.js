const express = require("express")
const { Router } = express;
const ProductController = require("../../controllers/api/ProductController")
const ProductFactory = require("../../factories/ProductFactory")

const productRouter = Router()

productRouter.get('/', ProductController.getProducts)
productRouter.get('/products-test', ProductFactory.createFakers)
productRouter.get('/:id', ProductController.getProduct)
productRouter.post('/', ProductController.insertProduct)
productRouter.put('/:id', ProductController.updateProduct)
productRouter.delete('/:id', ProductController.deleteProduct)
productRouter.delete('/', ProductController.deleteAll)

module.exports = productRouter