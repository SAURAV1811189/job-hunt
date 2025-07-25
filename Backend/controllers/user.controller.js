import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { fullname, email, password, phoneNumber, role } = req.body;
    // Check if all required fields are filled or not
    if (!fullname || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    // Check if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }
    //password converting into hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    await User.create({
      fullname,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    });
    res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//login controller
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    // Check if all required fields are filled or not
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    // Check if the user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist or incorrect email or password",
        success: false,
      });
    }
    // Check if the password is correct
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid password",
        success: false,
      });
    }
    // Check if the user role correct
    // Assuming 'role' is a string that you want to match against the user's role
    if (role !== user.role) {
      return res.status(403).json({
        message: "Account is mot exist with current role role",
        success: false,
      });
    }
    //if everything is correct than generate a token
    // Note: Token generation logic is not included here, but you can use libraries like jsonwebtoken to create a token.
    const tokenData = {
      userid: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",  // Token expiration time
    });

    //create user
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile, // Assuming profile is an optional field
    };

    //store token in cookie
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.error("Error during login:", error);
  }
};


//logout controller
export const logout = async (req, res) => {
  try {
    // Clear the cookie
    res.clearCookie("token");
    res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error during logout:", error);
    
  }
};


//update user or profile controller
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
   const file = req.file; // Assuming you are using multer for file uploads
    // If you want to handle file uploads, you can process the file here

  
    

    //cloudnary upload code comes here later for the file
if(skills){
 const skillsArray = skills.split(",");
}
   
    const userId = req.id; //middleware authentication id se ayega

    // Update the user profile
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    //update user profile
    user.fullname = fullname;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.profile.skills = skillsArray;
    user.profile.bio = bio; // Assuming profile is an object with a bio field

    // Save the updated user

    //resume comes here later.....

    await user.save(); 
    
    //create user object to send in response
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile, // Assuming profile is an object with skills and bio
    };
    
    res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });

  } catch (error) {
    console.error("Error during profile update:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
