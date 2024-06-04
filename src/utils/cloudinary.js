import {v2 as cloudinary} from 'cloudinary';
          
// for file handling 
import fs from 'fs';

// created to upload file from localstorage to cloudinary

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

// method to take localfilepath ie path of our file on our pc and then upload it on cloudinary

const uploadOnCloudinary=async(localFilePath)=>{
    try{
        // if filepath does not exists
        if (!localFilePath) return null

        // localpathfile exists upload it to cloudinary
        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto'
        });

        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary ", response);
        // remove the file from local as uploaded on cloudinary using fs.unlinl
        fs.unlinkSync(localFilePath)
        return response;


    }
    catch(error){
        fs.unlinkSync(localFilePath)  // remove the locally saved temporary file as the upload operation got failed
        return null


    }

}



export {uploadOnCloudinary}