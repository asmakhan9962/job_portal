import React, { useContext, Fragment, useEffect, useState } from 'react'
import CategoryContext from '../../context/category/categoryContext';
import CategoryItem from './CategoryItem';
import { Spinner } from '../layouts/Spinner';
const postsPerPage = 5;

const Categories = () => {
  const categoryContext = useContext(CategoryContext);
  const { categories, loading, filtered, getCategories } = categoryContext;
  const [count, setCount] = useState(0);
  const [next, setNext] = useState(postsPerPage);

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);

  const handleNext = () => {
    if(next <= categories.length){
      setCount((prevCount) => prevCount + 5);
      setNext((prevValue) => prevValue + 5);
    }
  };

  const handlePrev = () => {
    if(count <= categories.length && count > 0){
      setCount((prevCount) => prevCount - 5);
      setNext((prevValue) => prevValue - 5);
    }
  };

  if (categories !== null && categories.length === 0 && !loading) {
    return <h4>Please add a category</h4>;
  }

  if (loading) {
    return <Spinner />
  }
  else {
    return (
      <Fragment>
        {filtered !== null
          ? filtered.map(category =>
            (<CategoryItem key={category._id} category={category} />))
          : categories.slice(count,next).map(category =>
            (<CategoryItem key={category._id} category={category} />))

        }
        <p>
          <button className='btn btn-primary btn-sm' onClick={handlePrev}>Previous</button>
          <button className='btn btn-primary btn-sm' onClick={handleNext}>Next</button>
        </p>
      </Fragment>
    );
  }
};

export default Categories;