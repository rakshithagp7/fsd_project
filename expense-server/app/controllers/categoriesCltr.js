const Category = require('../models/category')
const Expense = require('../models/expense')
const categoriesCltr = {}

categoriesCltr.create = (req, res) => {
    const body = req.body
    const userId = req.user.id
    const category = new Category({
        name: body.name,
        userId: userId
      })
    category.save()
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.json(err)
        })
}

categoriesCltr.list = (req, res, next) => {
    const userId = req.user.id
    Category.find({userId : userId})
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.json(err)
        })
}

categoriesCltr.destroy = (req, res) => {
    const id = req.params.id
    const userId = req.user.id
    Category.findOne({ _id: id, userId: userId })
        .then((category) => {
            return Expense.deleteMany({ categoryId: id })
                .then(() => category.remove())
        })
        .then((category) => {
            res.json(category)
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
  }
  
  

module.exports = categoriesCltr

// // console.log('data',data)
            // Expense.deleteMany({categoryId: data._id})
            //     .then((exp) => {
            // //console.log('exp',exp)
            //        res.json(exp)}
            //     )
            //     .catch(err => {res.json(err)})