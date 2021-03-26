import React, { useContext, Fragment, useEffect } from 'react'
import JobContext from '../../context/job/jobContext';
import JobItem from './JobItem';
import { Spinner } from '../layouts/Spinner';

const JobFeatured = () => {
  const jobContext = useContext(JobContext);
  const { featured, loading, getFeatredJobs } = jobContext;

  useEffect(() => {
    getFeatredJobs();
    // eslint-disable-next-line
  }, []);

  if (featured !== null && featured.length === 0 && !loading) {
    return <h4>Please add a job</h4>;
  }
  if (loading) {
    return <Spinner />
  }
  else {
    return (
      <Fragment>
        {featured.map(job =>
          (<JobItem key={job._id} job={job} />))
        }
      </Fragment>
    );
  }
};

export default JobFeatured;