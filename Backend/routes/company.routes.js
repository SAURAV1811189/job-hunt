import express from 'express';
import isAuthenticated from '../middleware/isAuthenticate.js';
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/company.controler.js';

const router = express.Router();

router.route("/register").post(isAuthenticated,registerCompany); // Register a new company, requires authentication
router.route("/get").post(isAuthenticated, getCompany); // Get company details, requires authentication
router.route("/get/:id").get(isAuthenticated, getCompanyById); // Get company details by ID, requires authentication
router.route("/update/:id").post(isAuthenticated,updateCompany); // Update company details by ID, requires authentication

export default router;
// Export the router to be used in the main application file