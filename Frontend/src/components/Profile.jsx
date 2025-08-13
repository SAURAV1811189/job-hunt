import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";


// const skills=["html","css","js"]
const isResume =true;

const Profile = () => {
  
const [open ,setOpen]= useState(false);
const {user} = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between ">
        <div className="flex items-center gap-5">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEFUaT8V4-_21iVnEaf3jCpMBQNVxDlfpaCA&s"
              alt="profile"
            />
          </Avatar>
          <div>
            <h1 className="font-medium text-xl">{user?.fullname}</h1>
            <p>
              {user?.profile?.bio ? user?.profile?.bio : "NA"}
            </p>
          </div>
          </div>
          <Button onClick={() => setOpen(true)} variant="outline" className="text-right ">
            <Pen />
          </Button>
        </div>
        <div className="my-2"> 
          <div className="flex items-center gap-3 my-2">
            <Mail/>
          <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3"> <Contact/>
          <span>{user?.phoneNumber}</span>
          </div>
         </div>
         <div className="flex gap-2">
          <h1>Skills</h1>
          {
          user?.profile?.skills.length != 0 ? user?.profile?.skills.map((item, index) =><Badge key={index}>{item}</Badge> ) : <span>NA</span>
          }
         </div>
         <div className="flex items-center gap-2 mt-2">
  <h1 className="font-semibold">Resume</h1>
  {user?.profile?.resume ? (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={user?.profile?.resume}
      className="text-blue-500 w-full hover:underline cursor-pointer"
    >
      {user?.profile?.resumeOriginalName}
    </a>
  ) : (
    <span>NA</span>
  )}
</div>
        
      </div>
       <div className="max-w-4xl mx-auto bg-white rounded-2xl">
<h1 className="font-bold text-lg my-5">All Aplied job</h1>
            
            {/* Application Table */}
            <AppliedJobTable />

         </div>
              
              <UpdateProfileDialog open={open} setOpen={setOpen} />

    </div>
  );
};

export default Profile;
