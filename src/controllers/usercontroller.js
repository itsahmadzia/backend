import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"
import {uploadonCloudinary} from "../utils/cloudinary.js"
const registerUser = asyncHandler(async(req,res)=>{


const {userName,fullName,email,password}=req.body;
console.log(email);

/// validation check 

if(
[userName,fullName,email,password].some((f)=> 
    f?.trim()===""
)
){
   throw new ApiError(400,"All fields are required")
    

}
const existedUser = User.findOne({
    $or: [{userName,email}]
}

)
if(existedUser){
    throw new ApiError(409,"USER ALREADY EXISTED")

}

const avatarLocalpath= req.files?.avatar[0]?.path  // multer path 
const coverImageLocalpath= req.files?.coverImage[0]?.path  // multer path 

if(!avatarLocalpath){
    throw new ApiError(409,"AVATAR NOT FOUND ")
}
const avatar = await uploadonCloudinary(avatarLocalpath)
const coverImage = await uploadonCloudinary(coverImageLocalpath)
if(!avatar){
    throw new ApiError(409,"avatar not found ")
}


/// all validations done 


/// now we  need to create an entry 
const user= await User.create(
    {
        userName:userName.toLowerCase(),
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        fullName

    }
)

const createdUser= User.findById(user._id).select(
    "-password -refreshToken"
)

if(!createdUser){
    throw new ApiError(502,"SOMETHING WHEN WRONG WHILE CREATING THE PASSWORD ")
}

return res.status(201).json(
    new ApiResponse(200,createdUser,"USER REGISTERD")
)

})


//this method should run on a specific url
export {registerUser,}