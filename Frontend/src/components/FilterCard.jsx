import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

const filterdata = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
  }
]

const FilterCard = () => {
  return (
    <div>
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className='mt-3 mb-4' />
       
      {filterdata.map((data, index) => (
        <div key={index} className="mb-4">
          <h1 className="font-bold">{data.filterType}</h1>
          <RadioGroup className="mt-2 space-y-2">
            {data.array.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 ">
                <RadioGroupItem value={item} id={`${data.filterType}-${index}`} />
                <Label htmlFor={`${data.filterType}-${index}`}>{item}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  )
}

export default FilterCard
