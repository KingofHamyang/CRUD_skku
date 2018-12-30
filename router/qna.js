const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QnA_schema = new Schema({

    email: String,
    message: String
})

// create new User document
QnA_schema.statics.create = function (email, message) {
    const OTPs = new this({
        email,
        message
    })
    // return the Promise
    console.log(email);
    console.log(message);
    return OTPs.save()
}

// find one user by using username
QnA_schema.statics.findOneByEmail = function (email) {
    console.log("given has is" + email);
    return this.findOne({
        email
    }).exec()
}

QnA_schema.statics.findAll = function () {

    return this.find().exec()
}

QnA_schema.statics.deleteByEmail = function (email) {
    return this.findOneAndRemove({
        email
    })
}




module.exports = mongoose.model('QnA_schema', QnA_schema)