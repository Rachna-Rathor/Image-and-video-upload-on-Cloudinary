const express=require("express")
const router=express.Router();

const localFileUpload=require("../controllers/fileUpload")
const imageUpload=require("../controllers/fileUpload")
const videoUpload=require("../controllers/fileUpload")
const imageSizeReducer=require("../controllers/fileUpload")

// api
router.post("/localFileUpload",localFileUpload.localFileUpload);
router.post("/imageUpload",imageUpload.imageUpload);
router.post("/videoUpload",videoUpload.videoUpload);
router.post("/imageSizeReducer",imageSizeReducer.imageSizeReducer);
module.exports=router;