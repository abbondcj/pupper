// import React from 'react';
// import { Route, Switch } from 'react-router-dom';
// import ResponsiveAppBar from '../components/NavBar';
// import Activity from '../components/Activity';
// import Pups from '../components/Pups';
// import Home from '../components/Home';
// import Learn from '../components/Learn';
// import Profile from '../components/Profile';
// import { useAuth } from '../utils/context/authContext';

// // import { signOut } from '../utils/auth';

// export default function Authenticated({ user }) {
//   const userFromUseAuth = useAuth();
//   console.log(userFromUseAuth);
//   console.log(user);
//   return (
//     <>
//       <ResponsiveAppBar />
//       <Switch>
//         <Route exact path="/" component={() => <Home authenticatedUser={user} />} />
//         <Route path="/Pups" component={() => <Pups authenticatedUser={user} />} />
//         <Route path="/Activity" component={() => <Activity authenticatedUser={user} />} />
//         <Route path="/Learn" component={() => <Learn authenticatedUser={user} />} />
//         <Route path="/Profile" component={() => <Profile authenticatedUser={user} />} />
//       </Switch>
//     </>
//   );
// }
