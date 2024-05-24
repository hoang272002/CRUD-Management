const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: String,
    gender: String,
    status: String
})

const Userdb = mongoose.model('userdbs',schema)

module.exports = Userdb