import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        // Get the token from the request cookies
        const token = req.cookies.token;

        // Check if the token is provided
        if (!token) {
            return res.status(401).json({
                message: "unauthorized user,user not authenticated",
                success: false,
            });
        }

        //decode and  Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decoded) {
            return res.status(401).json({
                message: "unauthorized user,token is not valid",
                success: false,
            });
        }
        // Attach the decoded user information to the request object
        req.id = decoded.userid; // Assuming the token contains a user ID;
        next();
       

    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

export default isAuthenticated;
