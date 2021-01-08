var conection = require('../models/db') 
console.log('feedback is working')


var notificationController = ()=>
{
   
}
    // log notification

    notificationController.logNotification =(notification)=>
    {
        if(notification.message==undefined || notification.subject==undefined )
        {
            return new Error('Please provide required details for notification')
              
        }else{
        conection.query(`insert into notification
        (userId,subject,message,isRead) 
        values ('${notification.userId}','${notification.subject}','${notification.message}','false') `,(err,resp)=>{
            if(err)
            {
                return new Error(err)
            }
           
        })
    }

    }


    notificationController.getNotifications =(callback)=>
    {
       
        conection.query(`select * from notification`,(err,resp)=>{
            if(err)
            {
                return new Error(err)
            }
            return callback(resp)
           
        })
    }

    
    notificationController.getNotificationsPromise =()=>
    {
       
    let notifications = new Promise((resolve,reject)=>{
        conection.query(`select * from notification`,(err,resp)=>{
            if(err)
             return reject(err)
            
            return resolve(resp)
           
        })

    })  
    
    return notifications.then((val)=>
    {
        return val;
    })
    }


    

    //get all notification


    // get notification for a particular user


    // 
   
    



module.exports = notificationController