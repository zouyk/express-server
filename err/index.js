const joi = require('joi')

exports.err = (err, req, res, next) => {


    //验证err 处理
    if (err instanceof joi.ValidationError) {
        return res.send({
            status: 1,
            message: err.message
        })
    }
    //token 过期
    if (err.name === "UnauthorizedError") {
        return res.status(401).send({
            status: 1,
            message: "无效token"
        });
    }

    res.send({
        status: 500,
        message: err.message
    })
}