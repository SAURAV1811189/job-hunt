import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs();
  const dispatch = useDispatch();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  useGetAllJobs();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setSearchedQuery(e.target.value));
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl m-auto m-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({allJobs.length})
        </h1>
        <input
          type="text"
          value={searchedQuery}
          onChange={handleSearchChange}
          placeholder="Search jobs..."
          className="mb-6 p-2 border rounded w-full max-w-md"
        />
        <div className="grid grid-cols-3 gap-4">
          {(searchedQuery
            ? allJobs.filter((job) =>
                job.title?.toLowerCase().includes(searchedQuery.toLowerCase())
              )
            : allJobs
          ).map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
