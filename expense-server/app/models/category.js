const mongoose = require('mongoose')
const Expense = require('./expense')

const { Schema } = mongoose

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'category is required']
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})


const Category = mongoose.model('Category', categorySchema) 

module.exports = Category