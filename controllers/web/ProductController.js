const Product = require("../../models/Product");

const getProducts = async (req, res) => {
    try {
        const products = await Product.find().lean()
        res.render('products', {data: {products:products,
            username: req.session.username
        }})
    } catch (error) {
        throw new Error(`Error, can't get products: ${error}`)
    }
}

module.exports = { getProducts }