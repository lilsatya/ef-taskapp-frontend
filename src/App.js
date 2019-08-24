import React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter, Router } from 'react-router-dom'
import Routes from './routes'
import store, { history } from './store'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router history={history}>
          <Routes />
        </Router>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
