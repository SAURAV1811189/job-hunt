import express from 'express';
import cookieParser from 'cookie-parser'; //for token storage
import cors from 'cors'; //for cross-origin resource sharing
import dotenv from 'dotenv'; //for environment variables
dotenv.config(); // Load environment variables from .env file
import connectToDb from './utils/db.js'; // Import the database connection function
import userRoutes from './routes/user.routes.js'; // Import user routes
import companyRoutes from './routes/company.routes.js'; // Import company routes
import jobRoutes from './routes/job.routes.js'; // Import job routes
const app = express();

 
//midleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: 'http://localhost:5173', // Adjust this to your frontend URL
  credentials: true, // Allow cookies to be sent with requests
};
app.use(cors(corsOptions));


const PORT = process.env.PORT;

// here all apis will come
app.use('/api/v1/user', userRoutes); 
app.use('/api/v1/company', companyRoutes); 
app.use('/api/v1/job', jobRoutes); 

app.listen(PORT, () => {
    connectToDb(); // Connect to the database when the server starts
  console.log(`Server is running on port ${PORT}`);
});
