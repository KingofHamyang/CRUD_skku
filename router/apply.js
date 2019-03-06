const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Apply_schema = new Schema({

    name: String,
    studentID: String,
    email: String,
    phone: String,
    password: String,
    message1: String,
    message2: String,
    message3: String

})

// create new User document
Apply_schema.statics.create = function (name, studentID, email, phone, password, message1, message2, message3) {
    const UserInfo = new this({
        name,
        studentID,
        email,
        phone,
        password,
        message1,
        message2,
        message3
    })
    // return the Promise
    console.log(email);
    console.log(phone);
    console.log(password);
    return UserInfo.save()
}

// find one user by using username
Apply_schema.statics.findOneByStudentID = function (StudentID) {
    console.log("given has is " + StudentID);
    return this.findOne({
        studentID: StudentID
    }).exec()
}

Apply_schema.statics.findAll = function () {

    return this.find().exec()
}

Apply_schema.statics.deleteByStudentID = function (StudentID) {
    console.log("delete")
    console.log(StudentID)
    return this.findOneAndRemove({
        studentID: StudentID
    })
}




module.exports = mongoose.model('Apply_schema', Apply_schema)