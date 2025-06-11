import Job from "../models/job.model.js";


// Post a new job by admin
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      location,
      salary,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id; // logged in user id from isAuthenticated middleware
    // Assuming companyId is passed in the request body
    // Validate required fields
    if (
      !title ||
      !description ||
      !companyId ||
      !location ||
      !salary ||
      !requirements ||
      !jobType ||
      !experience ||
      !position
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements, // Split requirements by comma and trim whitespace
      location,
      salary,// Ensure salary is a number
      jobType,
      experienceLevel: experience, // Assuming experience is a string like "fresher", "1-2 years", etc.
      position,
      company: companyId, // Assuming companyId is the ID of the company posting the job
      created_By: userId,
    });

    await job.save();

    return res.status(201).json({
      message: "Job posted or created  successfully",
      success: true,
      job
    });
  } catch (error) {
    console.error("Error posting job:", error);
  }
};



//get all jobs  student side
export const getAllJobs = async (req, res) => {
  try {
    const Keyword = req.query.keyword || "";
    const query={
        $or: [
            { title: { $regex: Keyword, $options: "i" } }, // Case-insensitive search in title
            { description: { $regex: Keyword, $options: "i" } }, // Case-insensitive search in description
        ]

    };
    const jobs = await Job.find(query)
      .populate("company", "name location") // Populate company details
      .populate("created_By", "name email") // Populate user details
      .sort({ createdAt: -1 }); // Sort by creation date, most recent first
     if(!jobs){
        return res.status(404).json({
            message: "No jobs found",
            success: false,
        });
    }
     return res.status(200).json({
      message: "Jobs fetched successfully",
      success: true,
      jobs,
    });

  } catch (error) {

    console.error("Error fetching jobs:", error);
    
  }
};

//get job by id student side
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id; // Get job ID from request parameters
    const job = await Job.findById(jobId)
      .populate("company", "name location") // Populate company details
      .populate("created_By", "name email"); // Populate user details

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job fetched successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.error("Error fetching job:", error);
  }
};

//get  admin posted jobs
export const getAdminPostedJobs = async (req, res) => {
  try {
    const adminId = req.id; // Get the logged-in user's ID from the request
    const jobs = await Job.find({ created_By : adminId })
      .populate("company", "name location") // Populate company details
      .populate("created_By", "name email") // Populate user details
      .sort({ createdAt: -1 }); // Sort by creation date, most recent first

    if (!jobs ) {
      return res.status(404).json({
        message: "No jobs found for this user",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Jobs fetched successfully",
      success: true,
      jobs,
    });


  } catch (error) {
    console.error("Error fetching admin posted jobs:", error);
  }
};