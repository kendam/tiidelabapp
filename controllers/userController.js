
var userController = (app)=>{
var conection = require('../models/db') 
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auditManager = require('./trailController')

process.env.ACCESS_TOKEN_SECRETE



/*

Generate Token
jwt.sign(data,secrete)


Verify 
jwt.verify(data,scerete)


*/


    /**** GET REQUESTS */
 app.get('/',(req,res)=>{
    res.send('Welcome to my API')
 
  })
 
  app.get('/users',authenticate,(req,res)=>{
    
   

 
      conection.query('select * from users order by id desc',(err,resp)=>{
         res.status(200).send(resp)
 
      })
    })
 
  app.get('/users/:id',(req,res)=>{
      conection.query(`select * from users where id= ${req.params.id}`,(err,resp)=>{
         //delete resp[0].password
         res.send(resp)
 
      })
 
  })
  
 
  app.get('/chatrooms',(req,res)=>{
     res.send('This will show the list of chat rooms soon')
 })
 
 /*** POST REQUEST */
 
 app.post('/users',(req,res)=>{
     conection.query(`insert into users (firstName,lastName,lastLogin,age,city,email) values('${req.body.firstName}','${req.body.lasttName}','${req.body.lastLogin}','${req.body.age}','${req.body.city}','${req.body.email}')`,(err,resp)=>{
        if(err) throw err
         
         res.send('User successfully created ')
 
     })
 
     
 
 })
 
 app.post('/login',(req,res)=>{
    conection.query(`select * from users inner join user_role on users.id=user_role.userId where email='${req.body.email}'`,(err,resp)=>{
        if(err){
            res.send('Invalid credential')
        }
        console.log(req.body.email)
        if(resp){
            bcrypt.compare(req.body.password, resp[0].password, function(err, ress) {
                if(ress) {
                    delete resp[0].password
 

                    conection.query(`select permissionName from  permission 
.
                     inner join role_permission  on permission.permisionId=role_permission.permissionId where role_permission.roleId='${resp[0].roleId}'`,(err,respp)=>{
                        if(respp){
                            console.log('there are permissions')
                            resp[0].permissions= respp

                            console.log(resp[0])
                        }
                   
                
                    let tokenData = { "data": resp[0]}


                    //permission = getPermissionsByRoleId(resp[0].roleId)
                let token =  jwt.sign(tokenData,process.env.ACCESS_TOKEN_SECRETE,{expiresIn:'360000s'})
                let respData = {
                                 "data": resp[0],
                                 "accessToken":token
                                
                               }

                    res.send(respData)
                    trail={
                        actor : `${req.body.email}`,
                        action : ` ${req.body.email} successfully login`,
                        type   :"success"
                    }

                    auditManager.logTrail(trail)

                }) 
                } else {

                    trail={
                        actor : "anonymous",
                        action : `anonymous user with ${req.body.email} attempts login but failed`,
                        type   :"danger"
                    }

                    auditManager.logTrail(trail)
                   
                    res.send('Invalid credential 2')
                } 
              });
   
    }
    })
})

 
 app.post('/signup',(req,res)=>{
     bcrypt.hash(req.body.password,10,(err,hash)=>{
         if(err) throw err
     conection.query(`insert into users (firstName,lastName,lastLogin,age,city,email,password)
                      values('${req.body.firstName}',
                      '${req.body.lasttName}',
                      '${req.body.lastLogin}',
                      '${req.body.age}',
                      '${req.body.city}',
                      '${req.body.email}','${hash}')`,(errq,resp)=>{
        if(errq)
        {
            console.log(errq)
            res.send(errq.sqlMessage)
            res.end()
        }
         
         res.send('Signup successful')
 
     })
 })
     
 
 })
 
 
 app.put('/users/:id',(req,res)=>{
     // handle put
 })
 
 app.delete('/users/:id',(req,res)=>{
     // handle delete
 })

 
function authenticate(req,res,next)
{
    const token = req.headers['authorization']

    if(token==null)
    {
        return res.status(401).send("You have not been authenticated")
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRETE,(err,decodedTokenData)=>{
        if(err){
            return res.status(401).send(err.message)
        }

        req.user= decodedTokenData
        next()

    })
    
}

function can(action,data){
found = data.find(x=>x.permissionName==action)
return found
}

}


module.exports= userController