import React, { useState, useContext, useEffect } from 'react';
import CityContext from '../../context/city/cityContext';

const CityForm = () => {
  const cityContext = useContext(CityContext);

  const { addCity, updateCity, clearCurrent, current } = cityContext;

  useEffect(() => {
    if (current !== null) {
      setcity(current);
    } else {
      setcity({
        city: '',
        country: ''
      });
    }
  }, [cityContext, current]);

  const [citye, setcity] = useState({
    city: '',
    country: ''
  });

  const { city, country } = citye;

  const onChange = e =>
    setcity({ ...citye, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addCity(citye);
    } else {
      updateCity(citye);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit City' : 'Add City'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='city'
        value={city}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Country'
        name='country'
        value={country}
        onChange={onChange}
      />
      <div>
        <input
          type='submit'
          value={current ? 'Update City' : 'Add City'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default CityForm;