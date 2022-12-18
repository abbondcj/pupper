import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './Landing';
import LogIn from './LogIn';
import NewRegister from './NewRegister';

function UnauthorizedUserView() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={() => <Landing />} />
        <Route path="/Login" component={() => <LogIn />} />
        <Route path="/Register" component={() => <NewRegister />} />
      </Switch>
    </div>
  );
}

export default UnauthorizedUserView;
