import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
      cloud_name: process.env.CLOUDNAME,
      api_key: process.env.cloud_api_key,
      api_secret: process.env.api_secret,
});

const uploadonCloudinary = async (localPath) => {
      if (!localPath) return null;
      try{
           let response = await cloudinary.uploader.upload(localPath, {
            resource_type: "auto",
      });
      // file upload done
      console.log("FILE HAS BEEN UPLOADED ");
      console.log(response.url);
      return response;
      }catch(e){
fs.unlinkSync(localPath)
      }
   
}
export {uploadonCloudinary}

