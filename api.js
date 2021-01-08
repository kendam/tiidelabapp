var express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')

var users = require('./controllers/userController')
var feedback = require('./controllers/feedbackController')

app = express();

var corsOptions= {
    origin:["http://www.tiidelab.com","http://localhost","http://localhost:5000"],
    methods:"GET,POST",
    optionSucessStaus: 200
}
app.use(bodyParser(),cors(corsOptions))

/** Instantialte Controllers */
users(app)
feedback(app)
 app.listen(4700)
 console.log('listening at port 4700')