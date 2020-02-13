import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import CityContext from '../../context/city/cityContext';

const CityItem = ({ city }) => {
  const ctegoryContext = useContext(CityContext);
  const { deleteCity, setCurrent, clearCurrent } = ctegoryContext;

  const { _id, name, country } = city;
  const onDelete = () => {
    deleteCity(_id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
      </h3>
      <ul className='list'>
        {country && (
          <li>
            <i className='fas fa-table' /> {country}
          </li>
        )}
      </ul>
      <p>
        <button className='btn btn-dark btn-sm' onClick={() => setCurrent(city)}>Edit</button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>Delete</button>
      </p>
    </div>
  );
};

CityItem.propTypes = {
  city: PropTypes.object.isRequired
};
export default CityItem;