import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AsyncRoute from './async-route'

const Home = AsyncRoute(() => import('../Containers/Home'))
const About = AsyncRoute(() => import('../Containers/About'))

function Routes({ childProps = null }) {
  return (
    <Switch>
      <Route exact path="/" component={Home} props={childProps} />
      <Route exact path="/about" component={About} props={childProps} />
    </Switch>
  );
}

export default Routes;
