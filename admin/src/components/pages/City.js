import React from 'react'
import CityForm from '../cities/CityForm';
import CityFilter from '../cities/CityFilter';
import Cities from '../cities/Cities';

const City = () => {
  return (
    <div className='grid-2'>
      <div>
        <CityForm />
      </div>
      <div>
        <CityFilter />
        <Cities />
      </div>
    </div>
  )
}

export default City;