import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"
import express from "express"
import "dotenv/config"
 

let connectDB = (async ()=>{

    try {
       await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`)
    } catch (error) {
        console.log(error);
    }
} )
export default connectDB;   