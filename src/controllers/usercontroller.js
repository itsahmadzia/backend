import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
const generateAccessandRefreshTokens = async(userId)=>{
    try {
     const user=    User.findById(userId)
   const refreshToken =  user.generateRefreshToken();
   const accessToken =   user.generateAccessToken();
   user.refreshToken=refreshToken;
  await user.save({validateBeforeSave:false});

return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(501,"Something went wrong while generating the refresh and access tokens ")
    }

}
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
const existedUser =await User.findOne({
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
const avatar = await uploadOnCloudinary(avatarLocalpath)
const coverImage = await uploadOnCloudinary(coverImageLocalpath)
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

const createdUser= await User.findById(user._id).select(
    "-password -refreshToken"
)

if(!createdUser){
    throw new ApiError(502,"SOMETHING WHEN WRONG WHILE CREATING THE PASSWORD ")
}

return res.status(201).json(
    new ApiResponse(200,createdUser,"USER REGISTERD")
)

})

const loginUser=asyncHandler(async(req,res)=>{
    /**
     * get email username password
     * check email or username
     * check password 
     * generate tokens
     * assign tokens to cookies
     * return response (successfully login ) 
     */
    const {userName,email, password} = req.body;
    if(!(userName||email)){
        throw new ApiError(404,"EMAIL/USERNAME REQUIRED");
        console.log("die")
    }
    //now check for username or email 
    const user=await User.find({$or: [userName,email]});
    if(!user){
        throw new ApiError(404,"USER not Found ");
        console.log("die")
    }
    /// we have a method userschma.methods.isPasswordCorrect it is accessable by user not User as user is an instance and User is made by mongoose 


    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(404,"Incorrect Password ");
        console.log("die")
    }
    const {accessToken,refreshToken} = await generateAccessandRefreshTokens(user._id);

    const loggedinUser= await User.findById(user._id).select(
        "-refreshToken -password"
    )
const options={
    httpOnly:true, 
    secure: true
}

return res.
status(200).
cookie("accessToken",accessToken,options).
cookie("refreshToken",refreshToken,options).
json(
    new ApiResponse(200,{
        user:loggedinUser, accessToken,refreshToken
    },
    "User logged in successfully "
    )
)


    
})
//this method should run on a specific url
export {registerUser,loginUser}