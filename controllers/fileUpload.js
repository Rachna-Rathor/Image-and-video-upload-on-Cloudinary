const File=require("../models/File")
const cloudinary=require("cloudinary").v2;

const localFileUpload=async(req,res)=>{
    try {
        // fetch file
        const file=req.files.file;
         console.log("file aagyi jee ->",file);
         
         let path=__dirname+"/files/"+Date.now()+`.${file.name.split('.')[1]}`;
         console.log("path->",path);
         file.mv(path,(err)=>{
            console.log(err);
         });
         res.json({
            success:true,
            message:'Local file Uploaded Successfully',
         });

    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Not able to upload the file on server',
    })
    }
}

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
    const options = { folder };
    console.log("temp file path", file.tempFilePath);
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

const imageUpload = async (req, res) => {
    try {
        // data fetch
        const { name, email, tags } = req.body;
        console.log(name, email, tags);

        const file = req.files.imageFile;
        console.log(file);

        // validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType=file.name.split('.')[1].toLowerCase();
        // file type not supported
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            });
        }

        // file supported hai
        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        // db me entry 
        const fileData = await File.create({
            name,
            email,
            tags,
            imageUrl:response.secure_url,
        });

        res.json({
            success: true,
            imageUrl:response.secure_url,
            message: "Image successfully uploaded"
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Image upload failed"
        });
    }
};


function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
    const options = { folder };
    console.log("temp file path", file.tempFilePath);
    options.response_type="auto"
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

const videoUpload=async(req,res)=>{

    try {
        const { name, email, tags } = req.body;
        console.log(name, email, tags);

        const file = req.files.videoFile;
        console.log(file);

        const supportedTypes = ["mp4", "mov"];
        const fileType=file.name.split('.')[1].toLowerCase();
        // file type not supported
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            });
        }

         // file supported hai
         console.log("upload to codehelp in Cloudinary");
         const response = await uploadFileToCloudinary(file, "Codehelp");
         console.log(response);
       
          // db me entry 
        const fileData = await File.create({
            name,
            email,
            tags,
            imageUrl:response.secure_url,
        });

        res.json({
            success: true,
            imageUrl:response.secure_url,
            message: "Image successfully uploaded"
        });

    } 
    catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            message:"something went wrong !"
        })
        
    }
}


function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder,quality) {
    const options = { folder };
    console.log("temp file path", file.tempFilePath);
   if(quality){
    options.quality=quality;
   }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
const imageSizeReducer=async(req,res)=>{
    try {
        const { name, email, tags } = req.body;
        console.log(name, email, tags);

        const file = req.files.imageReduceFile;
        console.log(file);

        const supportedTypes = ["jpeg", "png","jpg"];
        const fileType=file.name.split('.')[1].toLowerCase();

        // file type not supported
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            });
        }

         // file supported hai
         console.log("upload to codehelp in Cloudinary");
         const response = await uploadFileToCloudinary(file, "Codehelp");
         console.log(response);
       
          // db me entry 
        const fileData = await File.create({
            name,
            email,
            tags,
            imageUrl:response.secure_url,
        });

        res.json({
            success: true,
            imageUrl:response.secure_url,
            message: "Image successfully uploaded"
        });
    } 
    catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            message:"something went wrong !"
        })
    }
}
module.exports ={
    localFileUpload:localFileUpload,
    imageUpload:imageUpload,
    videoUpload:videoUpload,
    imageSizeReducer:imageSizeReducer
}
