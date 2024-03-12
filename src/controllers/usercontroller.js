import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async(req,res)=>{
  
res.status(200).json({
    message:"OK"
})
})
//this method should run on a specific url now creating a route 
export {registerUser,}