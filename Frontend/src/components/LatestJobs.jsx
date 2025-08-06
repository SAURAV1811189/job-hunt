import React from 'react'
import LatestJobCards from './LatestJobCards'


const randomjobs = [1,2,3,4,5,6,7,8]
const LatestJobs = () => {
  return (
    <div className='max-w-7xl mx-auto my-20'>
        <h1 className='text-4xl font-bold'> <span className='text-[#6A38C2]'>Latest & Top</span> Job Openings</h1>

        {/* multipal job cards display here */}

      <div className='grid grid-cols-3 my-5 gap-4'>
        {
          randomjobs.slice(0, 6).map((item ,index) =><LatestJobCards key={index}/>)
        }
      </div>

    </div>
  )
}

export default LatestJobs
