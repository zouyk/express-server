const router = require('express').Router()
const controller = require('../controller/userInfo')
const joiValidation = require('../middleware/joiValidation')
const schema = require('../schema')



//获取用户信息
router.get('/userinfo', controller.userInfo)
//更新用户信息
router.post('/updateUserInfo', joiValidation(schema.schema_userinfo_validation), controller.updateUserInfo)
//重置密码
router.post('/resetPwd',joiValidation(schema.schema_resetPwd_validation),controller.resetPwd)
//更换头像
router.post('/updata/avatar',joiValidation(schema.schema_avatar_validation),controller.avatar)



module.exports = router