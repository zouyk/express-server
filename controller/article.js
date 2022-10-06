const db = require('../db')
const sql = require('../sql')


/* 
    ******* 获取文章分类列表 *********
    1.token 验证
    2.sql查询 返回列表

*/
exports.cateList = (req, res) => {

    db.query(sql.getArticleCateList, (err, result) => {

        if (err) return res.customSend(err);

        res.customSend('成功', 0, {
            list: result,
            total: result.length
        })
    })

}

/* 
    *********新增文章分类*********
    1.token校验
    2.validation 表单检验
    3.查重
    4.插入数据
*/

exports.newCate = (req, res) => {

    const {
        body
    } = req;

    db.query(sql.getArticleSingleCate, [body.name, body.alias], (err, result) => {

        if (err) return res.customSend(err)

        if (result.length === 1) {
            const resultObj = result[0];

            if (resultObj.name === body.name && resultObj.alias === body.alias) {
                return res.customSend('name 和 alias 已被占中,请修改后重试!')
            } else if (resultObj.name === body.name) {
                return res.customSend('name已被占中,请修改后重试!')
            } else {
                return res.customSend('alias已被占中,请修改后重试!')
            }
        }
        if (result.length === 2) {
            return res.customSend('name 和 alias 已被占中,请修改后重试!')
        }

        db.query(sql.insertInofArticleCate, body, (err, _) => {

            if (err) return res.customSend(err);

            if (_.affectedRows !== 1) return res.customSend('新增文章分类失败,请稍后再试!')
            
            res.customSend('成功', 0, {
                id: _.insertId
            })

        })

    })



    // res.customSend('ok');



}

/* 
    *********删除文章分类*********
    1.token校验
    2.validation 表单验证
    3.修改isdelete标记删除
*/
exports.deleteCate = (req,res)=>{
   const {body} =req;

   db.query(sql.deletArticleCate,body.id,(err,result)=>{

        if(err) return res.customSend(err);

        if(result.affectedRows!==1) return res.customSend('操作失败,请稍后再试!');

        res.customSend('成功',0,{})


   }) 


}

/* 
    ********更新指定文章分类信息********
    1.token校验
    2.validation 表单验证
    3.查重
    4.更新

*/

exports.updataCate =(req,res)=>{

   const {body} = req 

    db.query(sql.getArticleSingleCate,[body.name,body.alias],(err,result)=>{

        if (err) return res.customSend(err)

        if (result.length === 1) {
            const resultObj = result[0];

            if (resultObj.name === body.name && resultObj.alias === body.alias) {
                return res.customSend('name 和 alias 已被占中,请修改后重试!')
            } else if (resultObj.name === body.name) {
                return res.customSend('name已被占中,请修改后重试!')
            } else {
                return res.customSend('alias已被占中,请修改后重试!')
            }
        }
        if (result.length === 2) {
            return res.customSend('name 和 alias 已被占中,请修改后重试!')
        }

        db.query(sql.updateArticleCate,[{name:body.name,alias:body.alias},body.id],(err,_)=>{

            if(err) return res.customSend(err);
            if(_.affectedRows!==1)return res.customSend('更新失败请重试!')
            console.log(_);
            res.customSend('成功',0)
        })

    })

}
