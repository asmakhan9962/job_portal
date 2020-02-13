import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

const LeftNavbar = () => {
  return (
    <Fragment>
      <ul className="position-absolute ml-10">
        <h3><li><Link to="/categories">Categories</Link></li></h3>
        <h3><li><Link to="/jobs">Jobs</Link></li></h3>
        <h3><li><Link to="/cities">Cities</Link></li></h3>
      </ul>
    </Fragment>
  )
}

export default LeftNavbar;
