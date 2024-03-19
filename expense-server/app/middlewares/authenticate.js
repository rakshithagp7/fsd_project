const jwt = require('jsonwebtoken')

const authenticateUser = function(req, res, next) {
    let token = req.header('Authorization')
    if(token){
        token = token.split(' ')[1]
        try{
            const tokenData = jwt.verify(token, 'dct123')
            req.user = tokenData
            next()
        }
        catch(e){
            res.status(400).json(e)
        }
    }else{
        res.status(401).json({
            errors : 'invalid token'
        })
    }
}

module.exports = authenticateUser

