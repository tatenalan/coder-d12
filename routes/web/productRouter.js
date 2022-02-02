const express = require('express')
const { Router } = express;
const ProductController = require("../../controllers/web/ProductController")
const ProductFactory = require("../../factories/ProductFactory")

const productRouter = Router()

productRouter.get('/', ProductController.getProducts)
productRouter.get('/products-test', ProductFactory.createFakers)

module.exports = productRouter