// index for router
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Activity from '../components/Activity';
import Home from '../components/Home';
import Learn from '../components/Learn';
import ResponsiveAppBar from '../components/NavBar';
import Profile from '../components/Profile';
import Pups from '../components/Pups';

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
