import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "recruiter"], //when we face the two and more options we use enum
    required: true,
  },
  profile: {
    bio: {
      type: String,
    },
    skills: {
      type: [String], // Array of strings for skills
    },
    resume: {
      type: String
    },
    resumeOriginalName: {
      type: String
    },
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company" // Reference to the Company model
    },
    profilePhoto: {
      type: String, // URL or path to the profile photo
      default:""
    },
  },


});

const User = mongoose.model("User", userSchema);

export default User;
