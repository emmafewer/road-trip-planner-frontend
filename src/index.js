import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './redux/reducers/index'
import { BrowserRouter as Router} from 'react-router-dom'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
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


