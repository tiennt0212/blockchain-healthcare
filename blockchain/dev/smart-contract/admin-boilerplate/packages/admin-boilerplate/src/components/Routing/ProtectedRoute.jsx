import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'hooks';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
  // const { setIsAuthenticated } = useDispatch(({ authentication }) => ({
  //   setIsAuthenticated: authentication.setIsAuthenticated,
  // }));

  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthenticated ? <Component {...rest} {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

export default ProtectedRoute;
