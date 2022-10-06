const db = require('../db')
const sql = require('../sql')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const jwt = require('jsonwebtoken')
const secret = require('../config')

/* 
    ********注册********
    优化1: 
        对密码进行加密后储存
    优化2:
        对body传入数据进行 validation
    优化3:
        res.send函数优化
*/
exports.register = (req, res) => {

    const body = req.body
    //validator
    if (!body.username && !body.password) return res.customSend('密码或账号不能为空!')
    //查重
    db.query(sql.selectRepetitionUserInof, body.username, (err, data) => {

        if (err) return res.customSend(err)

        if (data.length) return res.customSend('用户名已存在,请重新输入!')
        //插入用户
        db.query(sql.insetIntoUserInfo, {
            username: body.username,
            password: bcrypt.hashSync(body.password, salt)
        }, (err, data) => {

            if (err) return res.customSend(err)

            if (data.affectedRows === 1) {
                res.customSend('成功', 0)
            } else {
                res.customSend('网络繁忙,请稍后再试')
            }

        })

    })

}

/* 
    ********登录***********
    思路 
        1.表单验证
        2.sql查询账号是否存在
        3.账号存在进行pwd验证
        4.返回token
*/
exports.login = (req, res) => {
    const body = req.body

    db.query(sql.selectUserInfo, body.username, (err, result) => {
        if (err) return res.customSend(err)

        if (!result.length) return res.customSend('该用户不存在,请先注册账号')

        if (bcrypt.compareSync(body.password, result[0].password)) {
            return res.customSend('成功', 0, {
                token: `Bearer ${jwt.sign({...result[0],password:''},secret.jwtSecretKey,{expiresIn:60*60})}`
            })
        }
        return res.customSend('密码错误,请检查后输入')

    })
}