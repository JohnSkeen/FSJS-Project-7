import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => (
  <div>
    <h2>Page Not Found</h2>
    <NavLink to='/mountains'>Head back to the mountains!</NavLink>
  </div>
);

export default NotFound;
