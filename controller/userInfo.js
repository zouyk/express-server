const sql = require('../sql')
const db = require('../db')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
/* 
    ********获取用户信息**********
    1.验证token是否有效
    2.通过ID查询用户信息
    3.返回指定信息 id,username,nikename,email

*/
exports.userInfo = (req, res) => {
    const auth = req.auth
    db.query(sql.selectFieldUserInfo, auth.id, (err, result) => {

        if (err) return res.customSend(err)

        if (result.length !== 1) return res.customSend('用户名已存在')

        res.customSend('成功', 0, result[0])

    })
}
/* 
    ********更新用户基本信息*************
    1.验证token
    2.validate 表单 nikename email id
    3.更具id查询用户是否存在
    4.更新用户信息
*/
exports.updateUserInfo = (req, res) => {

    const body = req.body
    const auth = req.auth

    if (Number(body.id) !== Number(auth.id)) return res.status(401).customSend('数据异常')

    db.query(sql.selectFieldUserInfo, body.id, (err, result) => {

        if (err) return res.customSend(err);

        if (result.length !== 1) return res.customSend('用户不存在!')

        db.query(sql.selectFieldUpdateUserInfo, [body, body.id], (err, result) => {

            if (err) return res.customSend(err);
            if (result.affectedRows !== 1) return res.customSend('更新失败,请稍后再试!')

            res.customSend('成功', 0, {})

        })

    })

}

/* 
    *******重置密码***********
    1.验证token
    2.validation 新旧密码
    3.查询旧密码是否正确
    4.更新密码
*/
exports.resetPwd = (req, res) => {

    const body = req.body
    const auth = req.auth
    db.query(sql.selectFieldPwd, auth.id, (err, result) => {

        if (err) return res.customSend(err);

        if (result.length !== 1) return res.customSend('用户不存在!');

        if (!bcrypt.compareSync(body.oldpwd, result[0].password)) return res.customSend('密码错误!')
        db.query(sql.updateFieldPwd, [{
            password: bcrypt.hashSync(body.newpwd, salt)
        }, result[0].id], (err, _result) => {

            if (err) return res.customSend(err);

            if (_result?.affectedRows !== 1) return res.customSend('重置失败!')

            res.customSend('成功', 0, {})

        })
    })

}


/* 
    *********更换头像***********
    1.token校验
    2.validation 表单
    3.更新头像字段    
*/

exports.avatar = (req, res) => {
    const body = req.body
    const auth = req.auth

    db.query(sql.updataAvatarInfo, [body.avatar, auth.id], (err, result) => {
            
        if (err) return res.customSend(err);
        if (result.affectedRows !== 1) return res.customSend('更新失败,请重新上传!')

        res.customSend('成功', 0, {})

    })
}