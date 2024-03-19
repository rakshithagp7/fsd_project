const express = require('express')
const cors = require('cors')
const PORT = 4040
const configDB = require('./config/database')
const routes = require('./config/routes')
const path = require('path')
const fs = require('fs')

const app = express()
configDB()
app.use(express.json())
app.use(cors())
app.use('/', routes)
app.use('/uploads', express.static('uploads'))

const uploadDirectory = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}


app.listen(PORT, () => {
    console.log('server running on', PORT)
})