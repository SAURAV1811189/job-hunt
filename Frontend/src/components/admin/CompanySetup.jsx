import React, { use, useEffect, useState } from 'react'
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const CompanySetup = () => {

  const [input, setinput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null
  });
  const {singleCompany}=useSelector((store) => store.company);

  const [loading, setloading] = useState(false);
  const parems=useParams();
const navigate=useNavigate();
  const eventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    
    setinput({ ...input, file: e.target.files[0] });
  };
  const submitHandler = async (e)=>{
    e.preventDefault();
   const formData = new FormData();
   formData.append("name", input.name);
   formData.append("description", input.description);
   formData.append("website", input.website);
   formData.append("location", input.location);
   if(input.file){
    formData.append("file", input.file);
   }
 
   try {
    setloading(true);
    const res = await axios.put(`${COMPANY_API_END_POINT}/update/${parems.id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        withCredentials: true
    });
    if(res.data.success){
        toast.success(res.data.message);
        navigate("/admin/companies");
    }
    
   } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
   }finally{
    setloading(false);
   }

  }
useEffect(() => {
 
    setinput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file:singleCompany.file || null
      
    });
  
}, [singleCompany])
  return (
    <div>
      <Navbar />
      <div className='max-w-xl mx-auto my-10'>
        <form onSubmit={submitHandler}>
          {/* Header */}
          <div className='flex items-center gap-5 p-8'>
            <Button onClick={() => navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className='font-bold text-xl'>Company Setup</h1>
          </div>

          {/* Fields */}
          <div className='grid grid-cols-2 gap-4 my-5'>
            <div>
              <Label>Company Name</Label>
              <Input  
              className="my-2"
                type="text"
                name="name"
                value={input.name}
                onChange={eventHandler}
                placeholder="Enter company name"
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
              className="my-2"
                type="text"
                name="website"
                value={input.website}
                onChange={eventHandler}
                placeholder="https://example.com"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
              className="my-2"
                type="text"
                name="description"
                value={input.description}
                onChange={eventHandler}
                placeholder="Short description"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
              className="my-2"
                type="text"
                name="location"
                value={input.location}
                onChange={eventHandler}
                placeholder="City, Country"
              />
            </div>
          </div>

          {/* File Upload */}
          <div className='mt-4'>
            <Label>Company Logo</Label>
            <Input
            className="my-2"
              type="file"
              name="file"
              accept="image/*"
              onChange={fileHandler}
            />
          </div>

          {/* Submit */}
          <div className='flex items-center justify-end my-5'>
           {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 animate-spin" />
              please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Update
            </Button>
          )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
