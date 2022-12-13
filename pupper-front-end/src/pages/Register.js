import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import UserApi from '../api/userApi';
import Banner from '../components/Banner';

function Register({ newUser }) {
  const [updatedFirstName, setUpdatedFirstName] = useState();
  const [updatedLastName, setUpdatedLastName] = useState();
  const [updatedUsername, setUpdatedUsername] = useState();
  /* eslint-disable */
  const [userEmail, setUserEmail] = useState(newUser.email);
  const history = useHistory();
  const submitUser = () => {
    const updatedUser = {
        firebaseId: newUser.uid,
        email: userEmail,
        firstName: updatedFirstName,
        lastName: updatedLastName,
        username: updatedUsername
    }
    if (updatedUser.firebaseId == null || updatedUser.email == null || updatedUser.firstName == null || updatedUser.lastName == null || updatedUser.username == null) {
      console.log("Null detected");
    } else {
      UserApi.UpdateUser(newUser.id, updatedUser, newUser.Aa)
      .then(() => {
        window.location.reload();
        history.replace("/");
      })
    }
  };

  return (
    <>
      <Banner showLogin={false} register={true} />
      <div>
        <h1>Pups</h1>
        <h3>Register</h3>
        <div>
          <input value={updatedFirstName} onChange={(e) => { setUpdatedFirstName(e.target.value); }} placeholder="First Name" />
          <input value={updatedLastName} placeholder="Last Name" onChange={(e) => { setUpdatedLastName(e.target.value); }} />
          <input value={userEmail} disabled placeholder={newUser.email} />
          <input value={updatedUsername} placeholder="Username" onChange={(e) => { setUpdatedUsername(e.target.value); }} />
        </div>
        <div>
          <button onClick={submitUser} type="submit">Submit</button>
        </div>
      </div>
    </>
  );
}

export default Register;
