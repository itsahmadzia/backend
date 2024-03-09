import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
      {
            userName: {
                  type: String,
                  required: true,
                  unique: true,
                  trim: true,
                  lowercase: true,
                  index: true,
            },
            email: {
                  type: String,
                  required: true,
                  unique: true,
                  trim: true,
                  lowercase: true,
            },
            fullName: {
                  type: String,
                  required: true,
                  trim: true,
            },
            avatar: {
                  type: String, //why string coz a cloud url is used
                  required: true,
            },
            coverImage: {
                  type: String, //why string coz a cloud url is used
            },
            watchHistory: [
                  {
                        type: Schema.Types.ObjectId,
                        ref: "Video",
                  },
            ],

            password: {
                  type: String,
                  required: [true, "PASSWORD IS REQUIRED"],
            },

            refreshToken: {
                  type: String,
            },
      },

      { timestamps: true }
);
userSchema.pre("save", async function(next){
if(this.isModified("password"))
   this.password =  await bcrypt.hash(this.password,10);//we need to add methods to check if password matches the decrypted version

next();
 

})
userSchema.methods=async function(pass){
   return await (bcrypt.compare(pass,this.password))
}
export const User = mongoose.model("User", userSchema);
