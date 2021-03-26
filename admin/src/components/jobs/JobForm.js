import React, { useState, useContext, useEffect, Fragment } from 'react'
import JobContext from '../../context/job/jobContext';
import CategoryContext from '../../context/category/categoryContext';
import CityContext from '../../context/city/cityContext';
// @ts-ignore
import { Multiselect } from 'multiselect-react-dropdown';

const JobForm = () => {
  const jobContext = useContext(JobContext);
  const categoryContext = useContext(CategoryContext);
  const cityContext = useContext(CityContext);

  const { categories, getCategories } = categoryContext;
  const { cities, getCities } = cityContext;

  const { addJob, updateJob, clearCurrent, current } = jobContext;
  useEffect(() => {
    getCategories().then(() => {
      console.log('categories', categories);
    })
    getCities().then(() => {
      console.log('cities', cities);
    })
    if (current !== null) {
      setjob(current);
    } else {
      setjob({
        title: '',
        job_description: '',
        phone: '',
        email: '',
        citys: cities.map(city => ({ name: city.city, key: city._id })),
        categorys: categories.map(category => ({ title: category.title, key: category._id })),
        category: [],
        city: [],
        selectedimage: null,
        featured: false
      });
    }
    // eslint-disable-next-line
  }, [jobContext, current]);

  const [job, setjob] = useState({
    title: '',
    job_description: '',
    phone: '',
    email: '',
    citys: cities.map(city => ({ name: city.name, key: city._id })),
    categorys: categories.map(category => ({ title: category.title, key: category._id })),
    category: [],
    city: [],
    selectedimage: null,
    featured: false
  });

  // @ts-ignore
  const { title, job_description, citys, categorys, category, city,
    email, phone, featured } = job;

  const onChange = (e) => {
    setjob({ ...job, [e.target.name]: e.target.value });
  }

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addJob(job);
    } else {
      updateJob(job);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  // @ts-ignore
  const onSelectCat = (selectedList, selectedItem) => {
    setjob({ ...job, category: selectedList });

  };
  // @ts-ignore
  const onSelectCity = (selectedList, selectedItem) => {
    setjob({ ...job, city: selectedList });

  };

  const toggleChange = () => {
    let ft = !featured;
    console.log('ft', ft);
    if (ft === true) {
      console.log('ft1', ft);
      setjob({ ...job, featured: true });
    }
    else {
      console.log('ft0', ft);
      setjob({ ...job, featured: false });
    }

  }

  const imageselect = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      setjob({
        ...job,
        selectedimage: reader.result
      });
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }

  return (
    <Fragment>
      <form onSubmit={onSubmit}
        encType="multipart/form-data">
        <h2 className='text-primary'>
          {current ? 'Edit Job' : 'Add Job'}
        </h2>
        <input
          type='text'
          placeholder='Title'
          name='title'
          value={title}
          onChange={onChange}
        />
        <textarea
          name='job_description'
          value={job_description}
          onChange={onChange}
          placeholder='Job Description' />
        <input
          type='text'
          placeholder='Email'
          name='email'
          value={email}
          onChange={onChange}
        />
        <input
          type='text'
          placeholder='Phone'
          name='phone'
          value={phone}
          onChange={onChange}
        />

        <Multiselect
          options={categorys} // Options to display in the dropdown
          onSelect={onSelectCat} // Function will trigger on select event
          selectedValues={category} // Preselected value to persist in dropdown
          displayValue="title" // Property name to display in the dropdown options
          placeholder="Select Categories"
          name='category'
        />

        <Multiselect
          options={citys} // Options to display in the dropdown
          onSelect={onSelectCity} // Function will trigger on select event
          selectedValues={city} // Preselected value to persist in dropdown
          displayValue="name" // Property name to display in the dropdown options
          placeholder="Select Cities"
          name='city'
        />
        <input type="file" name="image" onChange={imageselect} />
        <label className="mr-2">Featured</label>
        <input
          type='checkbox'
          name='featured'
          checked={featured ? true : false}
          onChange={toggleChange}
        />
        <div>
          <input
            type='submit'
            value={current ? 'Update Job' : 'Add Job'}
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
    </Fragment>
  );
}

export default JobForm;