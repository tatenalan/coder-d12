const faker = require('faker')

const createFakers = async (req, res) => {
    let products = [];
    for (let index = 1; index <= 5; index++) {
        products.push({
            id: index,
            name: faker.name.firstName(),
            price: faker.commerce.price(),
            thumbnail: faker.image.image(),
        })
    }   

    if (req.baseUrl == '/api/products') {
        res.send(products)  
    } else {
        res.render('productsTest', {products});
    }
}

module.exports = { createFakers }