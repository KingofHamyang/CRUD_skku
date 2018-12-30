var nodemailer = require('nodemailer');
var fs = require('fs')

const QnA_schema = require('./qna')


module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index.html');
    });
    app.post('/qnasubmit', function (req, res) {
        console.log(req.body);

        console.log(req.body["email_"]);
        console.log(req.body["message"]);
        console.log("##############################################");

        const email = req.body["email_"];
        const message = req.body["message"]

        // create a new user if does not exist


        QnA_schema.create(email, message);


        res.json({
            message: "good!"
        })






        // check username duplication





    });
}