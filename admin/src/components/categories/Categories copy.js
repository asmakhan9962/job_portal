import React, { useContext, Fragment, useEffect } from 'react'
import CategoryContext from '../../context/category/categoryContext';
import CategoryItem from './CategoryItem';
import { Spinner } from '../layouts/Spinner';

const Categories = () => {
  const categoryContext = useContext(CategoryContext);
  const { categories, loading, filtered, getCategories } = categoryContext;

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);

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
          : categories.map(category =>
            (<CategoryItem key={category._id} category={category} />))

        }
      </Fragment>
    );
  }
};

export default Categories;