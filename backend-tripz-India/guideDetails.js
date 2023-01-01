const mongoose = require("mongoose");

const GuideDetailsSchema =  new mongoose.Schema(
    {
        fullname:{type:String,required:true},
        bio:{type:String,required:true},
        location:{type:String,required:true},
        mobileno:{type:String,required:true},
        price:{type:String,required:true},
        experience:{type:String,required:true},
        imgsrc:{type:String,required:true},
        email:{type:String,required:true,unique:true},
    },
    {
        collection: "guideInfo"
    }
);

mongoose.model("guideInfo",GuideDetailsSchema);