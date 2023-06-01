const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    name : {type : String , required : true},
    email : {type : String , required : true},
    password : {type : String , required : true},
    avatar : {type : String , required : true},
    isAdmin : {type : Boolean , default : false},
    address : {
        flat : {type : String , required : true},
        street : {type : String , required : true},
        landmark : {type : String , required : true},
        city : {type : String , required : true},
        state : {type : String , required : true},
        country : {type : String , required : true},
        pin : {type : String , required : true},
        mobile : {type : String , required : true},
    }
}, {timestamps : true});

const User = mongoose.model('user' , UserSchema);
module.exports = User;