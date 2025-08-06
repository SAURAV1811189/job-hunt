import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { USER_API_END_POINT } from "../../utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice.js"; // Importing setLoading action
import store from "@/redux/store";
import { Loader2 } from "lucide-react";


const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: ""
  });
  const {loading}=useSelector((store=>store.auth));
  const navigate = useNavigate();
   const dispatch = useDispatch();
   


  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  
  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
         
      dispatch(setLoading(true));

        const res = await axios.post(`${USER_API_END_POINT}/login`, input , {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        });
        // console.log(res.data.success);
        if(res.data.success) {
             navigate("/");
            toast.success(res.data.message);
        } 
    } catch (error) {
        console.error("Error during signup:", error);
         toast.error(error.response.data.message)
    } finally{
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
          <h1 className="font-bold text-xl mb-5">Log In</h1>

          <div className="my-2">
            <Label>Email</Label>
            <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="Enter your email" />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="Enter your password" />
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
          </div>{
            loading ? <Button className="w-full my-4"> <Loader2  className="mr-2 h-4 animate-spin" / >
        please wait
            </Button> :  <Button type="submit" className="w-full my-4">
            Log In
          </Button>
          }
         
          <span className="flex items-center justify-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Sign up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
