import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import CategoryContext from '../../context/category/categoryContext';

const CategoryItem = ({ category }) => {
  const ctegoryContext = useContext(CategoryContext);
  const { deleteCategory, setCurrent, clearCurrent } = ctegoryContext;

  const { _id, title, description } = category;
  const onDelete = () => {
    deleteCategory(_id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {title}{' '}
      </h3>
      <ul className='list'>
        {description && (
          <li>
            <i className='fas fa-table' /> {description}
          </li>
        )}
      </ul>
      <p>
        <button className='btn btn-dark btn-sm' onClick={() => setCurrent(category)}>Edit</button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>Delete</button>
      </p>
    </div>
  );
};

CategoryItem.propTypes = {
  category: PropTypes.object.isRequired
};
export default CategoryItem;