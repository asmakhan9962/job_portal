import React, { useContext, useRef, useEffect } from 'react';
import JobContext from '../../context/job/jobContext';

const JobFilter = () => {
  const jobContext = useContext(JobContext);
  const text = useRef('');

  const { filterJobs, clearFilter, filtered } = jobContext;

  useEffect(() => {
    if (filtered === null) {
      // @ts-ignore
      text.current.value = '';
    }
  });

  const onChange = e => {
    // @ts-ignore
    if (text.current.value !== '') {
      filterJobs(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        // @ts-ignore
        ref={text}
        type='text'
        placeholder='Filter Jobs...'
        onChange={onChange}
      />
    </form>
  );
};

export default JobFilter;