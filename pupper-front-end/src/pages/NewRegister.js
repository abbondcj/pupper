import React from 'react';
import { useHistory } from 'react-router-dom';
import { signIn } from '../utils/auth';
import Banner from '../components/Banner';

export default function NewRegister() {
  const history = useHistory();
  return (
    <>
      <Banner showLogin />
      <div className="text-center mt-5">
        <h1>Register</h1>
        <button type="button" className="btn btn-success" onClick={() => { signIn().then(() => { history.push('/'); }); }}>
          Sign Up
        </button>
      </div>
    </>
  );
}
