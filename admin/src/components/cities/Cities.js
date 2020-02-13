import React, { useContext, Fragment, useEffect } from 'react'
import CityContext from '../../context/city/cityContext';
import CityItem from './CityItem';
import { Spinner } from '../layouts/Spinner';

const Cities = () => {
  const cityContext = useContext(CityContext);
  const { cities, loading, filtered, getCities } = cityContext;

  useEffect(() => {
    getCities();
    // eslint-disable-next-line
  }, []);

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
            (<CityItem key={city._id} city={city} />))
          : cities.map(city =>
            (<CityItem key={city._id} city={city} />))

        }
      </Fragment>
    );
  }
};

export default Cities;