// index for router
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Activity from '../pages/Activity';
import Home from '../pages/Home';
import Learn from '../pages/Learn';
import ResponsiveAppBar from '../components/NavBar';
import Profile from '../pages/Profile';
import Pups from '../pages/Pups';
import Register from '../pages/Register';

export default function Routes({ user }) {
  const [pupFilter, setPupFilter] = useState(0);
  const [houseFilter, setHouseFilter] = useState(0);
  const history = useHistory();

  if (user.firstName == null || user.lastName == null || user.username == null) {
    history.replace('/');
    return (
      <Register newUser={user} />
    );
  }

  return (
    <div>
      <ResponsiveAppBar resetHouseFilter={setHouseFilter} resetPupFilter={setPupFilter} user={user} />
      <Switch>
        <Route exact path="/" component={() => <Home authenticatedUser={user} setHouseFilterState={setHouseFilter} />} />
        <Route exact path="/Home" component={() => <Home authenticatedUser={user} setHouseFilterState={setHouseFilter} />} />
        <Route path="/Pups" component={() => <Pups authenticatedUser={user} setPupFilterState={setPupFilter} />} />
        <Route path="/Activity" component={() => <Activity authenticatedUser={user} houseFilterProp={houseFilter} pupFilterProp={pupFilter} />} />
        <Route path="/Learn" component={() => <Learn authenticatedUser={user} />} />
        <Route path="/Profile" component={() => <Profile authenticatedUser={user} />} />
      </Switch>
    </div>
  );
}
