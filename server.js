const express=require("express")
const app=express();
require('dotenv').config();


const PORT=process.env.PORT || 8000;

// middlewares add karni hai
app.use(express.json());
const fileUpload=require("express-fileupload")
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// connect database
const dbConnect=require("./config/dataBase")
dbConnect();
// connect cloudinary
const cloudinary=require("./config/cloudinary")
cloudinary.cloudinaryConnect();

// api routes mount karne hai
const upload=require("./routes/fileUpload");
app.use("/api/v1/upload",upload);
 // start server
app.listen(PORT,()=>{
    console.log(`server start listening at ${PORT}`);
})

