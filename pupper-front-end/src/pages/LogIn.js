import React from 'react';
import { useHistory } from 'react-router-dom';
import { signIn } from '../utils/auth';
import Banner from '../components/Banner';

export default function LogIn() {
  const history = useHistory();
  return (
    <>
      <Banner showLogin={false} />
      <div className="text-center mt-5">
        <h1>Welcome to pupper</h1>
        <h3>sign in</h3>
        <button type="button" className="btn btn-success" onClick={() => { signIn().then(() => { history.push('/'); }); }}>
          Sign In
        </button>
      </div>
    </>
  );
}
