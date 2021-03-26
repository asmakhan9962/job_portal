import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import JobContext from '../../context/job/jobContext';
import { useHistory } from 'react-router-dom';

const JobItem = ({ job }) => {
  const history = useHistory();
  const jobContext = useContext(JobContext);
  const { deleteJob, setCurrent, clearCurrent } = jobContext;

  const { _id, title, companyName, image, skills, location, email, phone, featured } = job;
  const onDelete = () => {
    deleteJob(_id);
    clearCurrent();
  };

  if (image) {
    var imagepaththumb = 'uploads/thumbs/' + image;
    var imagepathorignal = 'uploads/orignal/' + image;
  }
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {title}{' '}
      </h3>
      <ul className='list'>
        {companyName && companyName.length > 100 ?
          (
            <li>
              <span><strong>Company: </strong></span>{`${companyName.substring(0, 100)}...`}
            </li>

          ) :
          <li>
            <span><strong>Company: </strong></span>{companyName}
          </li>
        }
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
        {skills && (
          <li>
            {skills.map(function (object, i) {
              return <div className={"row"} key={i}>
                <i className='fas fa-tag mr-1' />{object}
              </div>;
            })}
          </li>
        )}
        {location && (
          <li>
            {location.map(function (object, i) {
              return <div className={"row"} key={i}>
                <i className='fas fa-city mr-1' />{object.cityText}
              </div>;
            })}
          </li>
        )}
        {imagepaththumb && (
          <a href={imagepathorignal} target="_blank" rel="noopener noreferrer"><img className='jobimg' src={imagepaththumb} alt="not found" /></a>
        )}
        <li>
          <span><strong>Featured: </strong>{featured ? 'Yes' : 'No'}</span>
        </li>

      </ul>
      <p>
        <button className='btn btn-dark btn-sm' onClick={() => {setCurrent(job); history.push('/jobs')}}>Edit</button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>Delete</button>
      </p>
    </div>
  );
};

JobItem.propTypes = {
  job: PropTypes.object.isRequired
};
export default JobItem;