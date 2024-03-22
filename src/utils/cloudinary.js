import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

  cloudinary.config({ 
    cloud_name: 'dyxhkjbve', 
    api_key: '967417783953617', 
    api_secret: '_HIV65sAR5ZjtD6frd0tAKlNKj0' 
  });

const uploadOnCloudinary = async (localFilePath) => {
      try {
          if (!localFilePath) return null
          //upload the file on cloudinary
          const response = await cloudinary.uploader.upload(localFilePath, {
              resource_type: "auto"
          })
          // file has been uploaded successfull
          console.log("file is uploaded on cloudinary ", response.url);
          fs.unlinkSync(localFilePath)
          return response;
  
      } catch (error) {
         fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
          return null;
      }
  }
  
  
  
  export {uploadOnCloudinary}

