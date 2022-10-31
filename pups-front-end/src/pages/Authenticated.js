import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ResponsiveAppBar from '../components/NavBar';
import Activity from '../components/Activity';
import Pups from '../components/Pups';
import Home from '../components/Home';
import Learn from '../components/Learn';

// import { signOut } from '../utils/auth';

export default function Authenticated({ user }) {
  console.log(user);
  return (
    <>
      <ResponsiveAppBar />
      <Switch>
        <Route exact path="/" component={() => <Home authenticatedUser={user} />} />
        <Route path="/Pups" component={() => <Pups authenticatedUser={user} />} />
        <Route path="/Activity" component={() => <Activity authenticatedUser={user} />} />
        <Route path="/Learn" component={() => <Learn authenticatedUser={user} />} />

      </Switch>
      {/* <div className="text-center mt-5">
        <h1>Welcome, {user.displayName}!</h1>
        <img
          referrerPolicy="no-referrer"
          src={user.photoURL}
          alt={user.displayName}
        />
        <div className="mt-2">
          <button type="button" className="btn btn-danger" onClick={signOut}>
            Sign Out
          </button>
        </div>
      </div> */}
    </>
  );
}
