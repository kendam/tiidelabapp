const nodemailer = require('nodemailer');


// server :  SMTP : simple mail transfer protocol
async function sendMail(){
var transporter = nodemailer.createTransport({
    host:'smtp.gmail.com.',
    port:467,
    secure:true,
    auth:{
        user:"",
        pass:""
    }
})

// email details 
transporter.sendMail({
    to:'kenny@ksolutionsng.com',
    from:'"Kenny"<user@domain.com>',
    subject:'Test Email',
    text:' content comes here',
    html:'<h3>content comes here</h3>'
})
}

sendMail().catch(console.error)
