const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({

    username:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password: { type:String, required:true},
    fullName:{type:String},
    phone:{type:String},
    location:{type:String},
    gender:{type:String},
    isAdmin:{
        type: Boolean,
        default:false,
    },
    img:{type:String}
    

 },{timestamps: true});

 module.exports = mongoose.model("User",UserSchema)