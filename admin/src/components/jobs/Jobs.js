import React, { useContext, Fragment, useEffect, useState } from 'react'
import JobContext from '../../context/job/jobContext';
import JobItem from './JobItem';
import { Spinner } from '../layouts/Spinner';
import JobFilter from './JobFilter';

const postsPerPage = 10;
const Jobs = () => {
  const jobContext = useContext(JobContext);
  const { jobs, loading, filtered, getJobs } = jobContext;
  const [count, setCount] = useState(0);
  const [next, setNext] = useState(postsPerPage);

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line
  }, []);

  const handleNext = () => {
    if(next <= jobs.length){
      setCount((prevCount) => prevCount + 5);
      setNext((prevValue) => prevValue + 5);
    }
  };

  const handlePrev = () => {
    if(count <= jobs.length && count > 0){
      setCount((prevCount) => prevCount - 5);
      setNext((prevValue) => prevValue - 5);
    }
  };

  if (jobs !== null && jobs.length === 0 && !loading) {
    return <h4>Please add a job</h4>;
  }
  if (loading) {
    return <Spinner />
  }
  else {
    return (
      <>
        <JobFilter />
        <div className='grid-2'>
          <Fragment>
            {filtered !== null
              ? filtered.map(job =>
                (<JobItem key={job._id} job={job} />))
              : jobs.slice(count,next).map(job =>
                (<JobItem key={job._id} job={job} />))

            }
          </Fragment>
        </div>
        <div>
        {(jobs !== null && jobs.length === 0 && !loading) ?
          <p className="mb-7 mt-3">
            <button className='btn btn-primary btn-sm' onClick={handlePrev}>Previous</button>
            <button className='btn btn-primary btn-sm' onClick={handleNext}>Next</button>
          </p>
        : <h4>No job found</h4>
        }
        </div>
      </>
    );
  }
};

export default Jobs;