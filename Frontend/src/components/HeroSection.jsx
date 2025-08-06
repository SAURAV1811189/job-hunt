import React from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

const HeroSection = () => {
  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
      <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium '>No. 1 Job Hunt Website</span>

      <h1 className='text-5xl font-bold'>Search ,Apply & <br /> Get Your <span className='text-[#6A38C2]'>DreamJob</span></h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt qui distinctio voluptatem repellendus enim! Velit.</p>
      <div className='flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center m-auto'>
        <input type="text" placeholder='Find your dream jobs...'
        className='outline-none border border-none w-full' />
        <Button className="rounded-r-full bg-[#6A38C2] ">
            <Search className='h-5 w-5'/>
        </Button>

      </div>
     </div>
    </div>
  )
}

export default HeroSection
