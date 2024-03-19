const Expense = require('../models/expense')
// const path = require('path')
// const fs = require('fs')

const expensesCltr = {}

expensesCltr.create = (req, res) => {
    const body = req.body
    const userId = req.user.id
    const expense = new Expense({
        name: body.name,
        amount: body.amount,
        categoryId: body.category,
        userId: userId,
        description: body.description
    })
    expense.save()
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}


expensesCltr.list = (req, res) => {
    const userId = req.user.id
    Expense.find({userId: userId})
        .then((expenses) => {
            res.json(expenses)
        })
        .catch((err) => {
            res.json(err)
        })
}

expensesCltr.update = (req, res) => {
    const userId = req.user.id
    const body = req.body
    const id = req.params.id
    
    Expense.findOneAndUpdate({_id:id, userId: userId}, body, { new: true, runValidate: true})
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}

expensesCltr.destroy = (req, res) => {
    const id = req.params.id
    Expense.deleteById(id)
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}

expensesCltr.deletedExpenses = (req, res) => {
    Expense.findDeleted(function(err, documents){
        if(err){
            res.json(err)
        }
        res.json(documents)
    })
}

expensesCltr.deleteForever = (req, res) => {
    const id = req.params.id
    const userId = req.user.id
    Expense.findOneAndDelete({_id: id, userId: userId})
        .then((expense) => {
            res.json(expense)
        })
        .catch(err => res.json(err))
}

expensesCltr.restore = (req, res) => {
    const id = req.params.id;
    Expense.restore({_id: id}, function(err, result){
        if(err){
            res.json(err)
        }
        res.json(result)
    })
}

// expensesCltr.expenseInvoice = (req, res) => {
//     const filename = req.params.filename
//     const filePath = path.join(__dirname, 'uploads', filename)
//     fs.readFile(filePath, (err, filepath) => {
//         if (err) {
//           console.error(err);
//           return res.status(500).send('Failed to download file');
//         }
//     })
//     res.setHeader('Content-Type', 'application/pdf')
//     res.setHeader('Content-Disposition', `attachment; filename=${filename}`)
//     res.sendFile(filePath)
// }

module.exports = expensesCltr
