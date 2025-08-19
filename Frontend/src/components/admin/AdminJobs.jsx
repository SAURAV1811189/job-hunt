import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setsearchJobByText } from "@/redux/jobSlice";

 const AdminJobs = () => {
  useGetAllAdminJobs();

  const [input, setinput] = useState("");
  
    const naavigate = useNavigate();
    const dispatch=useDispatch();
    useEffect(() => {
      dispatch(setsearchJobByText(input));
    },[input])
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input className="w-fit" placeholder="Filter by name ,role" onChange={(e) => setinput(e.target.value)} />
          <Button onClick={() => naavigate("/admin/jobs/create")}> New Jobs</Button>
        </div>
      <AdminJobsTable/>
 

      </div>
    </div>
  );
};

export default AdminJobs;
