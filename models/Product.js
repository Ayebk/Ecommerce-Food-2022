const mongoose = require("mongoose");

const randomNumber = parseInt("729" + Math.floor(Math.random() * 1000000000));

const ProductSchema = new mongoose.Schema({

    title:{type:String, required:true, unique:true},
    desc:{type:String},
    details:{type:String},
    price:{type: Number, required:true},
    priceDesc:{type:String},
    brand:{type:String,required:true},
    catalogNumber:{type:Number,default:randomNumber},
    categories: {type: Array},
    inStock:{type: String},
    img:{type:String}
    
    

 },{timestamps: true});

 module.exports = mongoose.model("Product",ProductSchema)