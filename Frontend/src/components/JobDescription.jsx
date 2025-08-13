
import { Badge } from "./ui/badge";
import { Ghost } from "lucide-react";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";

import axios from "axios";
import { use, useEffect } from "react";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useState } from "react";

const JobDescription = () => {
  
      



  const params=useParams(); //to get the job id
  const jobId=params.id;
  const {user}=useSelector((store) => store.auth);
  const {singleJob}=useSelector((store) => store.job);
  const isInitiallyApplied = singleJob?.applications?.some(application=>application.applicant===user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
   const dispatch = useDispatch();

   const applyJobHandler= async ()=>{

    try {
      const res= await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials:true});
console.log(res.data);

      if(res.data.success){
        // dispatch(setSingleJob(res.data.job));
        setIsApplied(true);   //update the local state
        const updatedJob = {...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
        dispatch(setSingleJob(updatedJob));     //help us to real time ui update 
        toast.success(res.data.message);

      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      
    }

   }

useEffect(() => {
        const fetchSingleJob= async () => {
            try {
                const res=await axios.get(`${ JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
          //  console.log(res.data);
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    // console.log(res.data.job);
                    setIsApplied(res.data.job.applications.some(application=>application.applicant===user?._id));  //ensure teh state is in sync with fetch data
                    toast.success(res.data.message);
                }

            } catch (error) {
                console.log(error);
            }
        };

        fetchSingleJob();
    },[jobId,dispatch, user?._id ]) 
  
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between ">
        <div>
          <h1 className="font-bold text-xl  ">{singleJob?.title}</h1>
          <div className="flex  items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold " variant={Ghost}>
             
             {singleJob?.position} Positions
            </Badge>
            <Badge className="text-[#F83002] font-bold " variant={Ghost}>
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold " variant={Ghost}>
              {singleJob?.salary}
            </Badge>
          </div>
        </div> 

        
        <Button
        onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          
          {isApplied ? "Already applied" : "Apply Now "}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium my-4 py-4">Job Description</h1>
      <div className="my-4">
         <h1 className="font=bold my-4">Role : <span className="pl-4 font-normal text-gray-800"> {singleJob?.title}</span></h1>
          <h1 className="font=bold my-4">Location : <span className="pl-4 font-normal text-gray-800"> {singleJob?.location}</span></h1>
          <h1 className="font=bold my-4">Description : <span className="pl-4 font-normal text-gray-800"> {singleJob?.description}</span></h1>
          <h1 className="font=bold my-4">Experiense : <span className="pl-4 font-normal text-gray-800"> {singleJob?.experienceLevel}</span></h1>
          <h1 className="font=bold my-4">Salery : <span className="pl-4 font-normal text-gray-800">1{singleJob?.salary}</span></h1>
          <h1 className="font=bold my-4">Total Application : <span className="pl-4 font-normal text-gray-800">  {singleJob?.applications?.length || 0
}</span></h1>
          <h1 className="font=bold my-4">Posted Date : <span className="pl-4 font-normal text-gray-800"> {singleJob?.createdAt?.split("T")[0] || ""
}</span></h1>

        
      </div>
    </div>
  );
};


export default JobDescription;
