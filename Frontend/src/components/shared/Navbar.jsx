import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { setUser } from "@/redux/authSlice";


const Navbar = () => {
  
  const {user}=useSelector((store) => store.auth);
  console.log(user)
   const dispatch = useDispatch();
   const navigate = useNavigate();
  const logoutHandler = async() => {
    try {
      
       const res=await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true});
       if(res.data.success){
        dispatch(setUser(null));
        toast.success(res.data.message);
        navigate("/");
       }

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      
    }
  };

  return (
    <div className="flex items-center justify-between mx-auto max-w-7xl h-16  ">
      <div className="m-2">
        <h1 className="font-bold text-2xl text-black">
          Job<span className="font-bold text-red-600">Portal</span>
        </h1>
      </div>
      <div className="flex items-center gap-5">
     <ul className="flex space-x-6">


   {
    user && user?.role ==="recruiter" ? (
      <>
      <li className="font-semibold text-gray-800"> <Link to="/admin/companies">Companies</Link></li>
          <li className="font-semibold text-gray-800"><Link to="/admin/jobs">Jobs</Link></li>
      </>
    ) :
    (
      <>
<li className="font-semibold text-gray-800"> <Link to="/">Home</Link></li>
          <li className="font-semibold text-gray-800"><Link to="/jobs">Jobs</Link></li>
          <li className="font-semibold text-gray-800"><Link to="/browse">Browse</Link></li>
      </>
    )
   }
       

          
        </ul>

        {!user ? (
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button className=" cursor-pointer" variant="outline">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                className=" cursor-pointer  bg-blue-600 text-white"
                variant="outline"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={user?.profile?.profilePhoto}
                  alt="@shadcn"
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="flex  gap-4 space-y-2">
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
                <div>
                  <h4 className="font-semibold">{user?.fullname}</h4>
                  <p className="text=sm text-muted-foreground">
                    {user?.profile?.bio}
                  </p>
                </div>
              </div>
              <div className="flex flex-col text-gray-600 cursor-pointer ">

             
             {
              user && user?.role ==="student" && (
                 <div className="flex items-center ">
                  <User2 />
                  <Button className="cursor-pointer" variant="link">
                    <Link to="/profile">View Profile</Link>
                  </Button>
                </div>
              )
             }

                
                <div className="flex items-center ">
                  <LogOut />
                  <Button onClick={logoutHandler} className="cursor-pointer" variant="link">
                    log out
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default Navbar;
