import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Router } from 'react-router-dom'
import Routes from './Routes'
import store, { history } from './store'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename={window.location.host}>
        <Router history={history}>
          <Routes />
        </Router>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
