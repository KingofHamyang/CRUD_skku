const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const config = require("./config");





const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

//app.use(morgan("dev"));


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));
var router = require('./router/main_router')(app);

mongoose.connect(config.mongodbUri_userdata);
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", () => {
    console.log("connected to mongodb server");
});

app.listen(8080, () => {
    console.log(`Express is running on port 8080`);
});