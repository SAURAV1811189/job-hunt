import Company from "../models/company.model.js";
import User from "../models/user.model.js";
export const registerCompany = async (req, res) => {
  try {
    const { companyName} = req.body;
   
    if (!companyName ) {
      return res.status(400).json({
        message: "companyName is required",
        success: false,
      });
    }
    // Check if the company already exists
    let company = await Company.findOne({name:companyName });
    if (company) {
      return res.status(400).json({
        message: "Company already exists or you can't register with same company name",
        success: false,
      });
    }
    company=await Company.create({
      name:companyName,
      UserId:req.id
    })

   return res.status(201).json({
      message: "Company registered successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error during company registration:", error);
  }
}


//get the company details
export const getCompany = async (req, res) => {
  try {
    const userId = req.id;//logged in user id from isAuthenticated middleware
    const companies = await Company.find({ userId });
    
    if (!companies.length=== 0) {
      return res.status(404).json({
        message: "Companies not found",
        success: false,
      });
    }
    // If companies are found, return them
    return res.status(200).json({
      message: "Company details retrieved successfully",
      success: true,
      companies
    });
  } catch (error) {
    console.error("Error retrieving company details:", error);
   
  }
}   

//get all companies by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id; // Get the company ID from the request parameters
    const company = await Company.findById(companyId); // Find the company by ID
    
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    
    return res.status(200).json({
      message: "Company details retrieved successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.error("Error retrieving company details:", error);
    
  }
}   

//update company details
export const updateCompany = async (req, res) => {
    try {
         const {name, description, location, website} = req.body;
         const file = req.file; // Assuming you are using multer for file uploads
         //udhar cloudary ayega

         const updatedData = {
            name,
            description,
            location,
            website,
         };

         const company=await Company.findByIdAndUpdate(req.params.id, updatedData, { new: true });
         if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Company updated successfully",
            success: true,
            company,
        });
    } catch (error) {
        console.error("Error updating company:", error);
        
    }
}