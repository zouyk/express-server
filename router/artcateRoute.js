const router = require('express').Router()
const contorller = require('../controller/article')
const schema = require('../schema')
const joiValidation = require('../middleware/joiValidation')

//获取文章分类列表
router.get('/cateList', contorller.cateList)

//新增文章分类
router.post('/newCate', joiValidation(schema.schema_newCate_validation), contorller.newCate)

//删除文章分类
router.post('/deleteCate', joiValidation(schema.schama_deleteCate_validation), contorller.deleteCate)

//更新文章分类
router.post('/updateCate', joiValidation(schema.schama_updateCate_validation), contorller.updataCate)


module.exports = router