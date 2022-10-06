const path = require('path')
const fs = require('fs')

/* 
    *****文件上传*****
    1.token 验证
    2.validation 验证
    3. 写入文件
    4. 文件url

*/

exports.upload = (req, res) => {

    const {
        file
    } = req.files
    const body = req.body

    try {
        fs.writeFileSync(path.join(__dirname, '../static', file.name.toLocaleLowerCase()), file.data)
        res.customSend('OK', 0, {
            url: `http://127.0.0.1:8000/public/static/${file.name.toLocaleLowerCase()}`
        })
    } catch (e) {
        res.customSend(e)
    }




}