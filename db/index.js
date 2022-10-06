const mysql  = require('mysql');

const db = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'zouyunkuan',
    database:'my_db_01'
})

module.exports = db