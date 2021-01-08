var mysql = require('mysql');
require("dotenv").config()
/*** DATABASE CONNECTION  */

var conection = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME

})

conection.connect((err,res)=>{
    if(err) throw err

    console.log('db server connected')

})


module.exports = conection
