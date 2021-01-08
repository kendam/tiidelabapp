//Module 

var http = require('http');
var hello = require('./tiideLabModule');
var url  = require('url');
var fileSytem = require('fs')
const mysql = require("mysql")

/*
host
user
password


*/
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

 /* General syntax 
    
       conection.query(query,callback)

 */

conection.query('select * from users',(err,res)=>{
    if(err) throw err
    console.log(res)

})
/*

Take input from the client  :  Request

Respond to client request  : response

Request :

Head
Body

File System

create,read,update,delete

*/



http.createServer((request,response)=>{
 
    var val = url.parse(request.url,true).query;

   // ans = parseInt(val.val1) + parseInt(val.val2)

    fileSytem.appendFile('fileName.txt',`${val.user}\n`,()=>{
        console.log('file saved')
    })

   response.writeHead(200,{'host':'TiideLab'})
   response.end(`User details are  ${val.user}`)

    console.log('server listening at 7000')
}).listen(7000)