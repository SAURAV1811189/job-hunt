import { getAdminPostedJobs, getAllJobs, getJobById, postJob } from '../controllers/job.controller.js';
import isAuthenticated from '../middleware/isAuthenticate.js';
import  express from "express";

const router = express.Router();
router.route("/post").post(isAuthenticated, postJob); // Route to post a new job, protected by authentication middleware
router.route("/get").get(isAuthenticated,getAllJobs); // Route to get all jobs, protected by authentication middleware
router.route("/getAdminJobs").get(isAuthenticated,getAdminPostedJobs); // Route to get all jobs for admin, protected by authentication middleware
router.route("/get/:id").get(isAuthenticated,getJobById); // Route to get a specific job by ID, protected by authentication middleware

export default router; // Export the router to be used in the main application
// This file defines the routes for job-related operations in the application.