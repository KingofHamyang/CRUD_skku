var nodemailer = require('nodemailer');
var fs = require('fs')

const QnA_schema = require('./qna')


module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index.html');
    });
    app.get('/qnalist', (req, res) => {
        QnA_schema.findAll().then((element) => {
            console.log(element.length)
            res.render('qnalist', {
                qnadata: element,
                size: element.length
            });
        })

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


        res.send("good");






        // check username duplication





    });
}