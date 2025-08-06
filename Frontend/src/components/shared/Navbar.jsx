import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = false; //user nhi hai
  return (
    <div className="bg-white flex w-full justify-between items-center p-4 shadow-md ">
      <div className="m-2">
        <h1 className="font-bold text-2xl text-black">
          Job<span className="font-bold text-red-600">Portal</span>
        </h1>
      </div>
      <div className="flex items-center gap-5">
        <ul className="flex space-x-6">
          <li className="font-semibold text-gray-800">Home</li>
          <li className="font-semibold text-gray-800">Jobs</li>
          <li className="font-semibold text-gray-800">Browse</li>
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
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="flex  gap-4 space-y-2">
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
                <div>
                  <h4 className="font-semibold">SAURAV</h4>
                  <p className="text=sm text-muted-foreground">
                    Lorem ipsum dolor sit amet.
                  </p>
                </div>
              </div>
              <div className="flex flex-col text-gray-600 cursor-pointer ">
                <div className="flex items-center ">
                  <User2 />
                  <Button className="cursor-pointer" variant="link">
                    View Profile
                  </Button>
                </div>
                <div className="flex items-center ">
                  <LogOut />
                  <Button className="cursor-pointer" variant="link">
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
