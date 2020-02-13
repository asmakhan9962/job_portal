import React, { useContext, useEffect, Fragment } from 'react'
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <h1 className='text-primary'>Welcome to Admin panel of Rizk.pk</h1>
      <p>Rizk.pk will provide a platform to connect employer with employee.</p>
    </Fragment>
  )
}

export default Home;