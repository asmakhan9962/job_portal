import React from 'react'
import CategoryForm from '../categories/CategoryForm';
import CategoryFilter from '../categories/CategoryFilter';
import Categories from '../categories/Categories';

const Category = () => {
  return (
    <div className='grid-2'>
      <div>
        <CategoryForm />
      </div>
      <div>
        <CategoryFilter />
        <Categories />
      </div>
    </div>
  )
}

export default Category;