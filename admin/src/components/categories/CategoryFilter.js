import React, { useContext, useRef, useEffect } from 'react';
import CategoryContext from '../../context/category/categoryContext';

const CategoryFilter = () => {
  const categoryContext = useContext(CategoryContext);
  const text = useRef('');

  const { filterCategories, clearFilter, filtered } = categoryContext;

  useEffect(() => {
    if (filtered === null) {
      // @ts-ignore
      text.current.value = '';
    }
  });

  const onChange = e => {
    // @ts-ignore
    if (text.current.value !== '') {
      filterCategories(e.target.value);
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
        placeholder='Filter Categories...'
        onChange={onChange}
      />
    </form>
  );
};

export default CategoryFilter;