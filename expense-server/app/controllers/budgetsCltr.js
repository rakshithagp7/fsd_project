const Budget = require('../models/budget')

const budgetsCltr = {}

budgetsCltr.show = (req, res) => {
    const id = req.user.id
    Budget.findOne({userId: id})
        .then((budget) => {
            res.json(budget)
        })
        .catch((err) => {
            res.json(err)
        })
}

budgetsCltr.update = (req, res) => {
   const body = req.body
   const id = req.params.id
   const userId = req.user.id
   Budget.findOneAndUpdate({_id: id, userId: userId }, body, { new: true, runValidate: true} )
        .then((response) => {
            res.json(response)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = budgetsCltr