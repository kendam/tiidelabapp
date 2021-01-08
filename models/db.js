var mysql = require('mysql');
/*** DATABASE CONNECTION  */

var conection = mysql.createConnection({
    host:"localhost",
    user:"tiidelabuser",
    password:"Password@123",
    database:"test"

})

conection.connect((err,res)=>{
    if(err) throw err

    console.log('db server connected')

})


module.exports = conection
