const express = require('express')
const router = express.Router()
const multer = require('multer')
const usersCltr = require('../app/controllers/usersCltr')
const authenticateUser = require('../app/middlewares/authenticate')
const budgetsCltr = require('../app/controllers/budgetsCltr')
const categoriesCltr = require('../app/controllers/categoriesCltr')
const expensesCltr = require('../app/controllers/expensesCltr')
const profilesCltr = require('../app/controllers/profilesCltr')

// auth
router.post('/api/users/register', usersCltr.register)
router.post('/api/users/login', usersCltr.login)
router.get('/api/users/account', authenticateUser, usersCltr.account)
router.delete('/api/users/delete-account', authenticateUser, usersCltr.deleteAccount)

// profile picture
const upload = multer({dest: 'uploads/'})
router.post('/api/upload-profile', upload.single('file'), authenticateUser, usersCltr.profile)
router.get('/api/upload-profile', authenticateUser, usersCltr.getProfile)


// budget
router.get('/api/budget/', authenticateUser, budgetsCltr.show)
router.put('/api/budget/:id', authenticateUser, budgetsCltr.update)

// categories
router.post('/api/categories', authenticateUser, categoriesCltr.create)
router.get('/api/categories', authenticateUser, categoriesCltr.list)
router.delete('/api/categories/:id', authenticateUser, categoriesCltr.destroy)

// expenses
router.post('/api/expenses', authenticateUser, expensesCltr.create)
router.get('/api/expenses', authenticateUser, expensesCltr.list)
router.put('/api/expenses/:id', authenticateUser, expensesCltr.update)
router.delete('/api/expenses/:id', authenticateUser, expensesCltr.destroy)
router.delete('/api/deleted-expenses', authenticateUser, expensesCltr.deletedExpenses)
router.delete('/api/delete-forever/:id', authenticateUser, expensesCltr.deleteForever)
router.get('/api/restore-expense/:id', authenticateUser, expensesCltr.restore)
//router.get('/api/expense-invoice/:filename', authenticateUser, expensesCltr.expenseInvoice)


// profile info
router.post('/api/profile-info', authenticateUser, profilesCltr.create)
router.get('/api/profile-info', authenticateUser, profilesCltr.show)
router.put('/api/profile-info/:id', authenticateUser, profilesCltr.update)


module.exports = router