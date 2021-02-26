import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './redux/reducers/index'
import { BrowserRouter as Router} from 'react-router-dom'

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
      <Router >
        <App />
      </Router>
    </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);


