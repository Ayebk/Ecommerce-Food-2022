const mongoose = require("mongoose");


const SliderSchema = new mongoose.Schema({

    title:{type:String, required:true},
    img:{type:String, required:true},
    bgc:{type:String, required:true},
    link:{type:String, required:true}
    

 },{timestamps: true});

 module.exports = mongoose.model("Slider",SliderSchema)

