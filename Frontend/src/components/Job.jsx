import React from "react";
import { Button } from "./ui/button";
import { Bookmark, Ghost } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

const Job = () => {
  return (
    <div className="p-5 rounded-md bg-white shadow-xl border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">2 days ago</p>
        <Button variant="outline" className="rounded-full " size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-3 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEFUaT8V4-_21iVnEaf3jCpMBQNVxDlfpaCA&s"
              alt="logo"
            />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-bold font-medium text-lg">Company Name</h1>
          <p>India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2"> Title</h1>
        <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet est atque esse ullam delectus fuga fugit iusto quod laboriosam dolorum.</p>
      </div>
      <div className="flex  items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold " variant={Ghost}>
          {" "}
          12 Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold " variant={Ghost}>
          Part Time
        </Badge>
        <Badge className="text-[#7209b7] font-bold " variant={Ghost}>
          24LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button variant="outline">Details</Button>
        <Button className="bg-[#7209b7]"> Save For Latter</Button>
      </div>
    </div>
  );
};

export default Job;
