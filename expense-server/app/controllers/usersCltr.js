const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Expense = require('../models/expense')
const Budget = require('../models/budget')
const Category = require('../models/category')

const usersCltr = {}

// register
usersCltr.register = (req, res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then((user) => {
            // const budget = new Budget({
            //     userId: user._id
            // })
            // budget.save()
            console.log(user)
            res.json(user)
        })
        .catch((err) => {
            res.json(err)
        })
}

// login
usersCltr.login = (req, res) => {
    const body = req.body
    User.findOne({email: body.email})
        .then((user) => {
            if(user){
                bcrypt.compare(body.password, user.password)
                    .then((match) => {
                        if(match){
                            const tokenData = {
                                id: user._id
                            }
                            const token = jwt.sign(tokenData, 'dct123')
                            res.json({
                                token: `Bearer ${token}`
                            })
                        }else{
                            res.json({
                                errors : 'invalid email or password'
                            })
                        }
                    })
                    .catch((err) => {
                        res.json(err)
                    })
            }else{
                res.json({
                    errors : 'invalid email or password'
                })
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

//account
usersCltr.account = (req, res) => {
    const id = req.user.id
    User.findOne({_id: id})
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            res.json(err)
        })
}

// delete account
usersCltr.deleteAccount = (req, res) => {
    const id = req.user.id
    Promise.all([
        User.deleteOne({_id: id}),
        Expense.deleteMany({userId: id}),
        Budget.deleteMany({userId: id}),
        Category.deleteMany({userId: id})
    ])
        .then(() => {
            res.json('successfully deleted your account, you can register again!!')
        })
        .catch(err => res.json(err))
}


// profile
usersCltr.profile = (req, res) => {
    const file = req.file.path
    const id = req.user.id
    User.findOneAndUpdate({_id: id}, {profilePicture: file}, {new: true, runValidate: true})
        .then((user) => {
            res.json(user)
        })
        .catch(err => res.json(err))
}

usersCltr.getProfile = (req, res) => {
    const id = req.user.id
    User.findOne({_id: id})
        .then((user) => {
            res.json(user)
        })
        .catch(err => res.json(err))
}

module.exports = usersCltr