import express from 'express';
import isAuthenticated from '../middleware/isAuthenticate.js';
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/company.controler.js';
import { singleUpload } from '../middleware/multer.js';

const router = express.Router();

router.route("/register").post(isAuthenticated,registerCompany); // Register a new company, requires authentication
router.route("/get").get(isAuthenticated, getCompany); // Get company details, requires authentication
router.route("/get/:id").get(isAuthenticated, getCompanyById); // Get company details by ID, requires authentication
router.route("/update/:id").put(isAuthenticated,singleUpload,updateCompany); // Update company details by ID, requires authentication

export default router;
// Export the router to be used in the main application file