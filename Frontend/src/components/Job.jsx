import React from "react";
import { Button } from "./ui/button";
import { Bookmark, Ghost } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job}) => {
  const navigate = useNavigate();
  // const jobId = "vguuoubob";

  

  const daysAgoFunction=(mongodbTime)=>{
    const createdAt = new Date(mongodbTime);
    const currentDate = new Date();
    const timeDiff = currentDate - createdAt;
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  }
  return (
    <div className="p-5 rounded-md bg-white shadow-xl border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{daysAgoFunction(job?.createdAt) ===0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
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
          <h1 className="font-bold font-medium text-lg">{job?.company?.name}</h1>
          <p>India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2"> {job?.title}</h1>
        <p className="text-sm text-gray-600">
          {job?.description}
        </p>
      </div>
      <div className="flex  items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold " variant={Ghost}>
          
          { job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold " variant={Ghost}>
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold " variant={Ghost}>
          {job?.salary}
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7]"> Save For Latter</Button>
      </div>
    </div>
  );
};

export default Job;
