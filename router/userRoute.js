//创建路由中间件 
const router = require('express').Router()
//引入control
const userControl = require('../controller/user')
const {
    schema_user_validation
} = require('../schema')
const joiValidation = require('../middleware/joiValidation')

//注册  
router.post('/register', joiValidation(schema_user_validation), userControl.register)
//登录
router.post('/login', joiValidation(schema_user_validation), userControl.login)







module.exports = router