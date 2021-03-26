import React, { useContext, Fragment, useEffect, useState } from 'react'
import CityContext from '../../context/city/cityContext';
import CityItem from './CityItem';
import { Spinner } from '../layouts/Spinner';
const postsPerPage = 5;

const Cities = () => {
  const cityContext = useContext(CityContext);
  const { cities, loading, filtered, getCities } = cityContext;
  const [count, setCount] = useState(0);
  const [next, setNext] = useState(postsPerPage);

  useEffect(() => {
    getCities();
    // eslint-disable-next-line
  }, []);

  const handleNext = () => {
    if(next <= cities.length){
      setCount((prevCount) => prevCount + 5);
      setNext((prevValue) => prevValue + 5);
    }
  };

  const handlePrev = () => {
    if(count <= cities.length && count > 0){
      setCount((prevCount) => prevCount - 5);
      setNext((prevValue) => prevValue - 5);
    }
  };


  if (cities !== null && cities.length === 0 && !loading) {
    return <h4>Please add a city</h4>;
  }

  if (loading) {
    return <Spinner />
  }
  else {
    return (
      <Fragment>
        {filtered !== null
          ? filtered.map(city =>
            (<CityItem key={city._id} citye={city} />))
          : cities.slice(count,next).map(city =>
            (<CityItem key={city._id} citye={city} />))

        }
        <p>
          <button className='btn btn-primary btn-sm' onClick={handlePrev}>Previous</button>
          <button className='btn btn-primary btn-sm' onClick={handleNext}>Next</button>
        </p>
      </Fragment>
    );
  }
};

export default Cities;