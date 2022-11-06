// index for router
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Activity from '../pages/Activity';
import Home from '../pages/Home';
import Learn from '../pages/Learn';
import ResponsiveAppBar from '../components/NavBar';
import Profile from '../pages/Profile';
import Pups from '../pages/Pups';

export default function Routes({ user }) {
  return (
    <div>
      <ResponsiveAppBar />
      <Switch>
        <Route exact path="/" component={() => <Home authenticatedUser={user} />} />
        <Route path="/Pups" component={() => <Pups authenticatedUser={user} />} />
        <Route path="/Activity" component={() => <Activity authenticatedUser={user} />} />
        <Route path="/Learn" component={() => <Learn authenticatedUser={user} />} />
        <Route path="/Profile" component={() => <Profile authenticatedUser={user} />} />
      </Switch>
    </div>
  );
}
