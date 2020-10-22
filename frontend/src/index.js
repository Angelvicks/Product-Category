import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'toastr/toastr.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
      <Fragment>
              <App />
      </Fragment>
  </BrowserRouter>,
  document.getElementById('root')
);

