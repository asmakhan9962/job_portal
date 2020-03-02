import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import JobContext from '../../context/job/jobContext';

const JobItem = ({ job }) => {
  const jobContext = useContext(JobContext);
  const { deleteJob, setCurrent, clearCurrent } = jobContext;

  const { _id, title, job_description, image, category, city, email, phone } = job;
  const onDelete = () => {
    deleteJob(_id);
    clearCurrent();
  };

  if (image) {
    console.log('/uploads/' + image);
    var imagepath = 'uploads/' + image;
  }
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {title}{' '}
      </h3>
      <ul className='list'>
        {job_description && (
          <li>
            <span><strong>Description: </strong></span>{job_description}
          </li>
        )}
        {email && (
          <li>
            <i className='fas fa-envelope  mr-1'></i>{email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone mr-1' />{phone}
          </li>
        )}
        {category && (
          <li>
            {category.map(function (object, i) {
              return <div className={"row"} key={i}>
                <i className='fas fa-tag mr-1' />{object.title}
              </div>;
            })}
          </li>
        )}
        {city && (
          <li>
            {city.map(function (object, i) {
              return <div className={"row"} key={i}>
                <i className='fas fa-city mr-1' />{object.name}
              </div>;
            })}
          </li>
        )}
        {image && (
          <img className='jobimg' src={require('../../../../uploads/' + image)} alt="not found" />
        )}

      </ul>
      <p>
        <button className='btn btn-dark btn-sm' onClick={() => setCurrent(job)}>Edit</button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>Delete</button>
      </p>
    </div>
  );
};

JobItem.propTypes = {
  job: PropTypes.object.isRequired
};
export default JobItem;