var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'seongjun6608@gmail.com',
        pass: 'qaz741123'
    }
});

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index.html');
    });
    app.post('/qnasubmit', function (req, res) {
        console.log(req.body);
        /* var mailOptions = {
             from: req.body["email_"],
             to: 'seongjun6608@gmail.com',
             subject: "message from " + req.body["email_"],
             text: req.body["message"]
         };

         transporter.sendMail(mailOptions, function (error, info) {
             if (error) {
                 console.log(error);
             } else {
                 console.log('Email sent: ' + info.response);
             }
         });*/
        console.log(req.body["email_"]);
        console.log(req.body["message"]);
        console.log("##############################################")
        res.send("complete")
    });
}