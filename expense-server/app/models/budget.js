const mongoose = require('mongoose')

const { Schema } = mongoose

const budgetSchema = new Schema({
    amount: {
        type: Number,
        default: 0,
        required: [true, 'amount is required']
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true})

const Budget = mongoose.model('Budget', budgetSchema)

module.exports = Budget