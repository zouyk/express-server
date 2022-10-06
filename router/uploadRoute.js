const router = require('express').Router()
const controller = require('../controller/upload')
const joiValidation = require('../middleware/joiValidation')
const schema = require('../schema')

router.post('/upload',joiValidation(schema.schema_file_validation), controller.upload)



module.exports = router