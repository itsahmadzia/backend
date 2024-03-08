import mongoose from "mongoose"
import { DB_NAME } from "../src/constants.js"
import express from "express"
import "dotenv/config"



const app=express()
let connectDB = (async ()=>{

    try {
       await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`)
       app.on("error",(error)=>{
                console.log("APP NOt able to connect");
           
       })

       app.listen(process.env.PORT,()=>{
        console.log(`app is listening on ${process.env.PORT} yeah`);
       })
    } catch (error) {
        console.log(error);
    }
} )
export default connectDB;