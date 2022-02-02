const { fake } = require('faker');
const faker = require('faker')

const createFakers = async (req, res) => {
    let messages = [];
    for (let index = 1; index <= 5; index++) {
        messages.push({
            author: {
                id:faker.internet.email(),
                firstName: faker.name.firstName(),
                lastName:faker.name.lastName(),
                age: faker.datatype.number(),
                alias: faker.name.firstName(),
                avatar: faker.image.image(),
            },
            date: '[1/25/2022, 4:14:42 AM]',
            text: faker.lorem.sentence()
        })
    }   

    if (req.baseUrl == '/api/messages') {
        res.send(messages)  
    } else {
        res.render('messagesTest', {messages});
    }
}

module.exports = { createFakers }