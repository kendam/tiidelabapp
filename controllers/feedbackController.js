var feedbackController = async(app)=>
{
    var conection = require('../models/db') 
     console.log('feedback is working')
     var notificationManager = require('./notificationController')

     
    // create feedback

    app.post('/feedback',(req,res)=>{
        if(req.body.content==undefined || req.body.subject==undefined )
        {
            
            res.status(400)
               .send('Please provide required details for feedback')
        }else{
           
            // get notifications 

    //  notificationManager.getNotifications((val)=>{
    //     console.log(val)
    // })
  
   notificationManager.getNotificationsPromise().then((val)=>{
       console.log(val)
   })

        conection.query(`insert into feedback(subject,content,dateCreated,status,feedbackEmail,feedbackTel) 
        values ('${req.body.subject}','${req.body.content}','${new Date()}','open','${req.body.feedbackEmail}','${req.body.feedbackTel}') `,(err,resp)=>{
            if(err)
            {
                res.status(400).send(err)
            }
            if(resp){
                var notify = {
                    "userId" : 1,
                    "subject": req.body.subject,
                    "message": req.body.content

                }
            notificationManager.logNotification(notify)
                //console.log('')
           

            res.status(200).send('We have received your feed')
        }
        })
    }

    })


    //get all feedback
    app.get('/feedback',(req,res)=>{
        conection.query('select * from feedback order by id desc',(err,resp)=>{
            res.send(resp)
    
         })
        
    })

    //get feedback by status


    // get feedback by Id


    //update feedback


    // delete feedback
 

}

module.exports = feedbackController