const mongoose=require("mongoose")
const fileSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl: {
          type:String,
    },
    tags: {
        type:String,
    },
     email: {
    type:String,
    }
},timesStamps=true)

const file=mongoose.model("File",fileSchema);
module.exports=file;