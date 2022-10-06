const express = require('express');
const app = express()
const PORT = process.env.PORT || 8000
const cors = require('cors')
const path = require('path')
const fileUpload = require('express-fileupload')
const {
    err
} = require('./err')
const customSend = require('./middleware/customSend')
const {
    expressjwt: jwt
} = require('express-jwt')
const secret = require('./config')



//解析application/json
app.use(express.json())
//解析application/x-www-from-urlencoded
app.use(express.urlencoded({
    extended: false
}))
//cors跨域配置
app.use(cors())
app.use(jwt({
    secret: secret.jwtSecretKey,
    algorithms: ['HS256']
}).unless({
    path: [/\/api\//, /\/public\//]
}))

app.use(fileUpload({}))

//日志
app.use((req, res, next) => {
    console.log(`${req.method} === ${req.url} === time ${Date.now()}`);
    next()
})
app.use(customSend())

app.use('/public/static', express.static(path.join(__dirname, '/static')))


const userInfoRoute = require('./router/userinfoRoute')
const userRoute = require('./router/userRoute')
const uploadRoute = require('./router/uploadRoute')
const articleCateList = require('./router/artcateRoute')
//路由
app.use('/api', userRoute)
app.use('/my', userInfoRoute)
app.use('/file', uploadRoute)
app.use('/article',articleCateList)
//全局错误处理
app.use(err)


//监听端口
app.listen(PORT, () => {

    console.log('express server runing at http://localhost:8000');

})