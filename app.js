const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
var nodemailer = require('nodemailer');



const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

//app.use(morgan("dev"));


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));
var router = require('./router/main_router')(app);

app.listen(8080, () => {
    console.log(`Express is running on port 8080`);
});