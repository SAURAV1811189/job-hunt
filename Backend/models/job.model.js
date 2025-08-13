import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements:[ {
    type: String,
   
  }],
  experienceLevel: {
    type: Number,
    // enum: ["fresher", "1-2 years", "3-5 years", "5+ years"],
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  jobType: {
    type: String,
    // enum: ["full-time", "part-time", "contract", "internship"],
    required: true,
  },
  position: {
    type: Number,
    // enum: ["junior", "mid-level", "senior"],
    required: true,
  },
  // The user who created the job
  created_By: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // The user who created the job
  },
  applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }
    ]
  
  
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);

export default Job;
// This model defines the structure of a job document in the MongoDB database.
// It includes fields for the job title, description, company, location, salary, the user who posted the job,