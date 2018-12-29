const express = require("express");
const morgan = require("morgan");



const app = express();
var router = require('./router/main_router')(app);
app.use(morgan("dev"));


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));

app.listen(8080, () => {
    console.log(`Express is running on port 8080`);
});