import React from 'react';
import ReactDOM from 'react-dom';

// REDUX
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducer from './redux/reducer';

// COMPONENST
import App from './components/app/app';

const composeEnhancers = typeof window === 'object'
// eslint-disable-next-line no-underscore-dangle
&& window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
// eslint-disable-next-line no-underscore-dangle
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  }) : compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(reduxThunk)));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
