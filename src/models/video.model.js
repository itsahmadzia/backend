import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
        videoFile : {
            type:String,
            required:true,
            
        },
        thumbnail : {
            type:String,
            required:true,
            
        },
        
        title : {
            type:String,
            required:true,
            
        },
        description : {
            type:String,
            required:true,
            
        },
        time : {
            type:Number,
            required:true,
            
        },
       views : {
            type:Number,
            default:true,
            
        },
        isPublished:{
            type:Boolean,
            default:true,
        },
        owner:{
            type:mongoose.Types.ObjectId,
            ref: "User",
        },
        
        
        
        

}, { timestramp: true });

export const Video = mongoose.model("Video", videoSchema);
