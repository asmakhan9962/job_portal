import React, { useContext, useRef, useEffect } from 'react';
import CityContext from '../../context/city/cityContext';

const CityFilter = () => {
  const cityContext = useContext(CityContext);
  const text = useRef('');

  const { filterCities, clearFilter, filtered } = cityContext;

  useEffect(() => {
    if (filtered === null) {
      // @ts-ignore
      text.current.value = '';
    }
  });

  const onChange = e => {
    // @ts-ignore
    if (text.current.value !== '') {
      filterCities(e.target.value);
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
        placeholder='Filter Cities...'
        onChange={onChange}
      />
    </form>
  );
};

export default CityFilter;