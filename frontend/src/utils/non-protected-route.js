import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect } from 'react-router-dom';

import { getLocalStorage } from './core';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if ((getLocalStorage('user-info') == null)) {
                    return <Component {...props} />;
                }
                return (
                        <Redirect
                            to={{
                                pathname: '/dashboard',
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    )
                
            }}
        />
    );
};
ProtectedRoute.propTypes = {
    component: PropTypes.func.isRequired,
    location: PropTypes.shape({}),
};
ProtectedRoute.defaultProps = {
    location: {}
};

export default ProtectedRoute;
