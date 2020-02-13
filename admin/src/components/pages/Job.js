import React from 'react'
import JobForm from '../jobs/JobForm';
import JobFilter from '../jobs/JobFilter';
import Jobs from '../jobs/Jobs';

const Job = () => {
  return (
    <div className='grid-2'>
      <div>
        <JobForm />
      </div>
      <div>
        <JobFilter />
        <Jobs />
      </div>
    </div>
  )
}

export default Job;