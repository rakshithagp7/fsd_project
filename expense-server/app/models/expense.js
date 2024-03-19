const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const { Schema } = mongoose

const expenseSchema = new Schema({
    name:{
        type: String,
        required: [true, 'name is required']
    },
    amount: {
        type: Number,
        required: [true, 'amount is required']
    },
    description: {
        type: String
    },
    expenseDate: {
        type: String,
        default: () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          },
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    invoice: String
})

expenseSchema.plugin(mongooseDelete, { overrideMethods: 'all' })

const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense

