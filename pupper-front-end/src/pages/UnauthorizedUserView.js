import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './Landing';
import LogIn from './LogIn';

function UnauthorizedUserView() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={() => <Landing />} />
        <Route path="/Login" component={() => <LogIn />} />
      </Switch>
    </div>
  );
}

export default UnauthorizedUserView;
