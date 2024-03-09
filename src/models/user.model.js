import mongoose, { Schema } from "mongoose";

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

export const User = mongoose.model("User", userSchema);
