import React from 'react';
import { Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Loader = ({ width, height, top, ...props }) => {
    return (
    <>
      <Spinner
          animation="border"
          role="status"
          style={{
              width: { width },
              height: { height },
              margin: 'auto',
              display: 'block',
              marginTop: top || '40vh',
              color: '#790e8b',
              overflow: 'hidden'
          }}
          {...props}
      >
          <span className="sr-only">Loading...</span>
      </Spinner>
    </>
    );
};
Loader.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    top: PropTypes.string
};

Loader.defaultProps = {
    width: '100px',
    height: '100px',
    top: '40vh'
};
export default Loader;
