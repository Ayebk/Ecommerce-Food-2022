const mongoose = require("mongoose");


const StoreSchema = new mongoose.Schema({

    img:{type:String, required:true},
    title:{type:String, required:true},
    desc:{type:String, required:true},
    bgc:{type:String, required:true},

    

 },{timestamps: true});

 module.exports = mongoose.model("Store",StoreSchema)


