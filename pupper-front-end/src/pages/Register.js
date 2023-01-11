import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import '../styles/register.css';
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
      window.alert("All fields must have values")
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
      <div className="register-component">
        <h3>Register</h3>
        <div className="register-form">
          <label htmlFor='fist'>First Name: </label>
          <input name='first' value={updatedFirstName} onChange={(e) => { setUpdatedFirstName(e.target.value); }} placeholder="First Name" />
          <label htmlFor='last'>Last Name: </label>
          <input name='last' value={updatedLastName} placeholder="Last Name" onChange={(e) => { setUpdatedLastName(e.target.value); }} />
          <label htmlFor='email'>Email: </label>
          <input name='email' value={userEmail} disabled placeholder={newUser.email} />
          <label htmlFor='username'>Username: </label>
          <input name='username' value={updatedUsername} placeholder="Username" onChange={(e) => { setUpdatedUsername(e.target.value); }} />
        </div>
        <div>
          <button onClick={submitUser} type="submit">Submit</button>
        </div>
      </div>
    </>
  );
}

export default Register;
