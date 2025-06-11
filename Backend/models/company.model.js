import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  location: {
    type: String,
   
  },
  logo: {
    type: String, // URL or path to the company logo
    default: "",
  },
  website: {
    type: String,
   
  },
  userId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
        required: true, // Assuming a company can have multiple users (e.g., employees)
    },
  ],
}, { timestamps: true });

const Company = mongoose.model("Company", companySchema);

export default Company;
