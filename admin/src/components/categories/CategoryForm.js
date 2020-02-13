import React, { useState, useContext, useEffect } from 'react';
import CategoryContext from '../../context/category/categoryContext';

const CategoryForm = () => {
  const categoryContext = useContext(CategoryContext);

  const { addCategory, updateCategory, clearCurrent, current } = categoryContext;

  useEffect(() => {
    if (current !== null) {
      setcategory(current);
    } else {
      setcategory({
        title: '',
        description: ''
      });
    }
  }, [categoryContext, current]);

  const [category, setcategory] = useState({
    title: '',
    description: ''
  });

  const { title, description } = category;

  const onChange = e =>
    setcategory({ ...category, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addCategory(category);
    } else {
      updateCategory(category);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Category' : 'Add Category'}
      </h2>
      <input
        type='text'
        placeholder='Title'
        name='title'
        value={title}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Description'
        name='description'
        value={description}
        onChange={onChange}
      />
      <div>
        <input
          type='submit'
          value={current ? 'Update Category' : 'Add Category'}
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

export default CategoryForm;