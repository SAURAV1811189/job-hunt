import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";


const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        password: "",
        phoneNumber: "",
        role: "",
        file: ""
    });
     const {loading}=useSelector((store) => store.auth);
     const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
 const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);
    if(input.file) {
       
        formData.append("file", input.file);
    }
    console.log(input);
    try {
      dispatch(setLoading(true));
        const res= await axios.post(`${USER_API_END_POINT}/register`, formData , {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true,
        });
        if(res.data.success) {
             navigate("/login");
            toast.success(res.data.message);
        } 
    } catch (error) {
        console.error("Error during signup:", error);
        toast.error(error.response.data.message)
    }finally{
      dispatch(setLoading(false));
    }
 }
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center  max-w-7xl mx-auto ">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border-gray-200 border rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input type="text" value={input.fullname} name="fullname" onChange={changeEventHandler} placeholder="Enter your full name" />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="Enter your email" />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="Enter your password" />
          </div>
          <div className="my-2">
            <Label>
             phoneNumber
            </Label>
            <Input type="text" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} placeholder="Enter your phone number" />
          </div>
          <div className="flex items-center justify-between ">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>

            <div className="flex items-center gap-3">
              <Label>Profile</Label>
              <Input accept="image/*"  type="file"  onChange={changeFileHandler} className="cursor-pointer" />
            </div>
          </div>
          {
            loading ? <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 animate-spin" / >
        please wait
            </Button> :  <Button type="submit" className="w-full my-4">Sign Up</Button>
          }
          
          <span className="flex items-center justify-center">Already have an account? <Link to="/login" className="text-blue-500">Log in</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
