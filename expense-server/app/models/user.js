const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const uniqueValidator = require('mongoose-unique-validator')
const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
const isEmail = require('validator/lib/isEmail')
const Budget = require('./budget')

const { Schema } = mongoose

const userSchema = new Schema({
    name:{
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        validate: {
            validator: function(value){
                return isEmail(value)
            },
            message : function(){
                return 'invalid email forma'
            }
        }
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        validate: {
            validator: function(value){
                return passwordFormat.test(value)
            },
            message: function(){
                return 'password should consists of 1 capital letter, 1 digit, 1 special character.'
            }
        }
    },
    profilePicture: { 
        type: String
    }
}, {timestamps: true})

userSchema.plugin(uniqueValidator)

userSchema.pre('save', function(next){
    bcrypt.genSalt()
        .then((salt) => {
            bcrypt.hash(this.password, salt)
                .then((encrypted) => {
                    this.password = encrypted
                    next()
                })
                .catch((err) => {
                    res.json(err)
                })
        })
        .catch((err) => {
            res.json(err)
        })
})

userSchema.pre('save', function(next){
    try{
        const budget = new Budget({
            userId: this._id,
            amount: 0
        })
        budget.save()
        next()
    }catch(err){
        res.json(err)
    }
})

userSchema.post('remove', function(doc, next){
    try{
        Budget.deleteOne({userId: doc._id})
        next()
    }catch(err){
        res.json(err)
    }
})

// userSchema.pre('remove', function(next){
//     const userId = this._id
//     const deleteExpense = Expense.deleteMany({userId})
//     const deleteBudget = Budget.deleteMany({userId})
//     const deleteCategory = Category.deleteMany({userId})

//     Promise.all([deleteExpense, deleteBudget, deleteCategory])
//         .then(() => {
//             next()
//         })
//         .catch((err) => {
//             next(err)
//         })
// })

const User = mongoose.model('User', userSchema)

module.exports = User