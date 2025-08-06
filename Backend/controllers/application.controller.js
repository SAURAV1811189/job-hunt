import Application from "../models/application.model.js";
import Job from "../models/job.model.js";
export const applyForJob = async (req, res) => { 
    try {
       
        const userId = req.id; // Get the user ID from the authenticated request
        const jobId = req.params.id; // Get the job ID from the request parameters
        // Check if the job ID is provided
        if (!jobId) {
        return res.status(400).json({
            message: "Job ID is required",
            success: false,
        });
        }
    
       
    
        // Check if the user has already applied for this job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
        return res.status(400).json({
            message: "You have already applied for this job",
            success: false,
        });
        }
     // Find the job by ID 
        const job = await Job.findById(jobId);
        if (!job) {
        return res.status(404).json({
            message: "Job not found",
            success: false,
        });
        }
        // Create a new application
        const newApplication = await Application.create({
        job: jobId,
        applicant: userId
        
        });
           job.applicants.push(userId); // Add the user to the job's applicants list
        await job.save(); // Save the updated job document
        
        res.status(201).json({
        message: "Application submitted or applied successfully",
        success: true,
        application: newApplication,
        });
    } catch (error) {
        console.error("Error applying for job:", error);
        
    }
    }

    // Get all applications for a specific job
    export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id; // Get the user ID from the authenticated request
        const application=await Application.find({ applicant: userId }).populate("job", "title description location salary jobType position");
        
              
    } catch (error) {
        console.error("Error retrieving applications:", error);
        
    }
}