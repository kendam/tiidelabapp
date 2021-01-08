var connection = require('../../test/models/db')

connection = require('../models/db')

const auditTrail=()=>{

}


auditTrail.logTrail =(trail)=>{
    connection.query(`insert into trail (actor,action,type) values ('${trail.actor}','${trail.action}','${trail.type}')`,(err,resp)=>{

        if(err){
            console.log(err)
        }
    })

}

module.exports = auditTrail