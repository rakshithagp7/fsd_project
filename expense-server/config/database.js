const mongoose = require('mongoose')

const configDB = () => {
    mongoose.connect('mongodb://localhost:27017/expens-app')
    .then(() => {
        console.log('connected to DB')
    })
    .catch((err) => {
        console.log('error connected to DB')
    })
}


module.exports = configDB