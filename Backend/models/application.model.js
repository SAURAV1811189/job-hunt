import mongoose from "mongoose";
const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job", // Reference to the Job model
    required: true,
  },
  applicant:{
    type: String, // Name of the applicant
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
}, { timestamps: true });
const Application = mongoose.model("Application", applicationSchema);
export default Application;
// This model defines the structure of an application document in the MongoDB database.
// It includes references to the Job and User models, as well as fields for resume, cover letter, and application status.