import React from 'react'
import JobForm from '../jobs/JobForm';
import JobFilter from '../jobs/JobFilter';
import { useHistory } from 'react-router-dom';
import JobFeatured from '../jobs/JobFeatured';

const Job = () => {
  const history = useHistory();

  return (
    <div className='grid-2'>
      <div>
        <JobForm />
      </div>
      <div>
        <JobFilter />
        <JobFeatured />
        <button className='btn btn-primary btn-block mb-5' onClick={() => history.push('/jobs/all') }>View All</button>
      </div>
    </div>
  )
}

export default Job;