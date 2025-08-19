import { setAllAdminJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const useGetAllAdminJobs = () => {
    const dispatch=useDispatch();
    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res=await axios.get(`${ JOB_API_END_POINT}/getAdminJobs`,{withCredentials:true});
           
                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs));
                    console.log(res.data.jobs);
                    toast.success(res.data.message);
                }

            } catch (error) {
                console.log(error);
            }
        };

        fetchAllAdminJobs();
    },[])
}

export default useGetAllAdminJobs
