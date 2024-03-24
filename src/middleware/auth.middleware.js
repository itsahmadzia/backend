import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"


export const verifyJWT =asyncHandler(async (req,res,next)=>{
try {
       const token =  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
       console.log("token.>" , token)
       if(!token){
       throw new ApiError(401,"Unauthorized access")
       }
       console.log(process.env.ACCESS_TOKEN_SECRET,"mxdmx");
       const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    console.log("decoded toe",decodedToken)
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    if(!user){
        /// frontend note in next lecture 
        throw new ApiError(401,"Invalid access Token")
    }
    req.user = user; 
    next()
} catch (error) {
    throw new ApiError(401,"Invalid access Token here")
}
})

