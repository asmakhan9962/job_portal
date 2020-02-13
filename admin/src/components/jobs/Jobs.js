import React, { useContext, Fragment, useEffect } from 'react'
import JobContext from '../../context/job/jobContext';
import JobItem from './JobItem';
import { Spinner } from '../layouts/Spinner';

const Jobs = () => {
  const jobContext = useContext(JobContext);
  const { jobs, loading, filtered, getJobs } = jobContext;

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line
  }, []);

  if (jobs !== null && jobs.length === 0 && !loading) {
    return <h4>Please add a job</h4>;
  }
  if (loading) {
    return <Spinner />
  }
  else {
    return (
      <Fragment>
        {filtered !== null
          ? filtered.map(job =>
            (<JobItem key={job._id} job={job} />))
          : jobs.map(job =>
            (<JobItem key={job._id} job={job} />))

        }
      </Fragment>
    );
  }
};

export default Jobs;