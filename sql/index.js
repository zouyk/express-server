const selectRepetitionUserInof = 'select * from ev_users where username=?'

const insetIntoUserInfo = 'insert into ev_users set ?'

const selectUserInfo = 'select * from ev_users where username=?'

const selectFieldUserInfo = 'select id,username,nickname,email from ev_users where id=?'

const selectFieldUpdateUserInfo = 'update ev_users set ? where id=?'

const selectFieldPwd = 'select * from ev_users where id=?'

const updateFieldPwd = 'update ev_users set ? where id=?'

const updataAvatarInfo = 'update ev_users set user_pic=? where id=?'


/* 文章分类 */

const getArticleCateList = 'select id,name,alias from  ev_article_cate where is_delete=0 order by id desc'

const getArticleSingleCate = 'select * from ev_article_cate where name=? or alias=?'

const insertInofArticleCate = 'insert into ev_article_cate set ?'

const deletArticleCate = 'update ev_article_cate set is_delete=1 where id=?'

const updateArticleCate = 'update ev_article_cate set ? where id=?' 


module.exports = {
    selectRepetitionUserInof,
    insetIntoUserInfo,
    selectUserInfo,
    selectFieldUserInfo,
    selectFieldUpdateUserInfo,
    updateFieldPwd,
    selectFieldPwd,
    updataAvatarInfo,
    getArticleCateList,
    getArticleSingleCate,
    insertInofArticleCate,
    deletArticleCate,
    updateArticleCate
}