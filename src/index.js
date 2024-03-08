
import mongoose from "mongoose";
import express from "express";
import { DB_NAME } from './constants.js'
import 'dotenv/config'
import connectDB from '../db/index.js'
const app=express()


// ;(async ()=>{

//     try {
//        await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`)
//        app.on("error",(error)=>{
//                 console.log("APP NOt able to connect");
//               //  throw error;
//        })

//        app.listen(process.env.PORT,()=>{
//         console.log(`app is listening on ${process.env.PORT} yeah`);
//        })
//     } catch (error) {
//         console.log(error);
//     }
// } )()
connectDB();