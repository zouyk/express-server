const joi = require('joi');
const {
    join
} = require('path');

const username = joi.string().alphanum().min(3).max(8).required();
const password = joi.string().alphanum().pattern(/^[\S]{6,10}$/).required();

const id = joi.number().min(1).required()
const nickname = joi.string().alphanum().min(3).max(8)
const email = joi.string().email()

const user_pic = joi.string().dataUri().required()

const cateName = joi.string().min(2).required()
const cateAlias = joi.string().alphanum().required()


exports.schema_user_validation = {
    body: joi.object({
        username,
        password
    })
}

exports.schema_userinfo_validation = {

    body: joi.object({
        id,
        nickname,
        email
    })

}

exports.schema_resetPwd_validation = {
    body: joi.object({
        oldpwd: username,
        newpwd: joi.not(joi.ref('oldpwd')).concat(password)
    })
}

exports.schema_avatar_validation = {
    body: joi.object({
        avatar: user_pic
    })
}

exports.schema_file_validation = {
    body: joi.object({
        filename: joi.string().required()
    }),
    files: joi.object({
        file: joi.required()
    })
}


exports.schema_newCate_validation = {
    body: joi.object({
        name: cateName,
        alias: cateAlias
    })
}

exports.schama_deleteCate_validation = {
    body: joi.object({
        id: joi.number().required()
    })
}

exports.schama_updateCate_validation = {
    body: joi.object({
        id:joi.number().required(),
        name: cateName,
        alias: cateAlias
    })
}