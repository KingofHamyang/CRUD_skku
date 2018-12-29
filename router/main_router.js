module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index.html');
        console.log('asdfasf!!!');
    });
    app.get('/about', function (req, res) {
        res.render('cv.html');
        console.log('asdfasf');
    });
}