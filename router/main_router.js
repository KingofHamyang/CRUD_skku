var nodemailer = require('nodemailer');
var fs = require('fs')

const QnA_schema = require('./qna')
const Apply_schema = require('./apply')


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
    app.get('/applylist', (req, res) => {
        Apply_schema.findAll().then((element) => {
            console.log(element.length)
            res.render('applylist', {
                applydata: element,
                size: element.length
            })
        })
    })
    app.post('/qnasubmit', function (req, res) {
        console.log(req.body);

        console.log(req.body["email_"]);
        console.log(req.body["message"]);
        console.log("##############################################");

        const email = req.body["email_"];
        const message = req.body["message"]

        // create a new user if does not exist


        QnA_schema.create(email, message).then((err) => {
            console.log(err);
            if (err) {

                res.send("의견 감사합니다. " + email + "로 연락드리겠습니다.")
            }
            else {
                res.send("서버에 문제가 있습니다. kjds1235@naver.com 로 직접 연락주세요 DB error")
            }
        })





    });
    app.post('/applysubmit', function (req, res) {
        console.log(req.body);

        console.log(req.body["email"]);
        console.log(req.body["message"]);
        console.log(req.body["name"]);
        console.log(req.body["studentID"]);
        console.log("##############################################");

        const name = req.body["name"];
        const message = req.body["message"]
        const studentID = req.body["studentID"];
        const phone = req.body["phone"]
        const password = req.body["password"];
        const email = req.body["email"]


        const create = (err) => {
            console.log(err);
            if (err) {
                throw new Error('username exists, try again!')
            } else {


                return Apply_schema.create(name, studentID, email, phone, password, message)

            }
        }
        const respond = (err) => {
            console.log(err);
            if (err) {

                res.send("지원해 주셔서 감사합니다! 결과는 " + email + " 또는 " + phone + "로 연락드리겠습니다.")
            }
            else {
                res.send("서버에 문제가 있습니다. kjds1235@naver.com 로 직접 연락주세요. DB error")
            }


        }
        const onError = (error) => {
            console.log(error)
            res.send("동일 학번으로 이미 지원서가 작성되었습니다. 수정을 원하시면, 내 지원서 보기 메뉴를 통해 원래 글을 복사한 후, 지원서 삭제를 통해 재지원 해주시면 감사하겠습니다.")
        }


        Apply_schema.findOneByStudentID(studentID)
            .then(create)
            .then(respond)
            .catch(onError)





    });

    app.post('/myapply', function (req, res) {
        let studentID = req.body["studentID"];
        let password = req.body["password"];

        Apply_schema.findOneByStudentID(studentID).then((element) => {
            console.log(element)
            console.log("myapply")
            if (element) {
                password_stored = element["password"];
                if (password != password_stored) {
                    res.send("비밀번호가 틀렸습니다. 다시 확인해주세요.")
                } else {
                    res.send(element["message"])
                }
            } else {
                res.send("해당 학번으로 지원된 이력이 없습니다. 학번을 확인해주세요.");
            }
        })
    });

    app.post('/deleteapply', function (req, res) {
        let studentID = req.body["studentID"];
        let password = req.body["password"];



        const create = (err) => {
            console.log(err);
            if (err) {

                password_stored = err["password"];
                if (password != password_stored) {
                    res.send("비밀번호가 틀렸습니다. 다시 확인해주세요.")
                } else {
                    res.send("지원서가 정상적으로 삭제되었습니다. 지원해주셔서 감사합니다." + err["studentID"])
                    return Apply_schema.deleteByStudentID(err["studentID"])
                }


            } else {
                throw new Error('username exists, try again!')

            }
        }

        const onError = (error) => {
            console.log(error)
            res.send("해당 학번으로 지원된 이력이 없습니다. 학번을 확인해주세요.");
        }


        Apply_schema.findOneByStudentID(studentID)
            .then(create)

            .catch(onError)



    });
}