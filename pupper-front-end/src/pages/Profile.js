import React, { useEffect, useState } from 'react';
import HouseApi from '../api/HouseApi';
import UserApi from '../api/userApi';
import AddHomeModal from '../components/AddHomeModal';

function Profile({ authenticatedUser }) {
  const [userFirstName, setFirstName] = useState(authenticatedUser.firstName);
  const [userLastName, setLastName] = useState(authenticatedUser.lastName);
  const [userUsername, setUsername] = useState(authenticatedUser.username);
  const [userPrimaryHouse, setPrimaryHouse] = useState(authenticatedUser.primaryHouseId);
  const [houseList, setHouseList] = useState(null);
  const [showAddHomeModal, setShowAddHomeModal] = useState(false);
  const [houseAdded, setNewHouseAdded] = useState(false);
  const [profileEdited, setProfileEdited] = useState(false);
  const userEmail = authenticatedUser.email;
  const submitEdits = () => {
    const updatedUser = {
      firebaseId: authenticatedUser.uid,
      firstName: userFirstName,
      lastName: userLastName,
      email: userEmail,
      username: userUsername,
      primaryHouseId: userPrimaryHouse,
    };
    if (updatedUser.firebaseId == null || updatedUser.firstName.length < 1 || updatedUser.lastName.length < 1 || updatedUser.email.length < 1 || updatedUser.username.length < 1) {
      window.location.alert('First name, Last name, Username must be entered');
    } else {
      UserApi.UpdateUser(authenticatedUser.id, updatedUser, authenticatedUser.Aa)
        .then(() => {
          window.location.reload();
        });
    }
  };

  useEffect(
    () => {
      HouseApi.GetHousesByUserId(authenticatedUser.id, authenticatedUser.Aa)
        .then((data) => {
          setHouseList(data);
        });
    }, [houseAdded],
  );

  return (
    /* eslint-disable */
    <div>
      <label htmlFor="firstName">First Name:</label>
      <input className="firstName" onChange={(e) => { setFirstName(e.target.value); setProfileEdited(true); }} value={userFirstName} placeholder="First Name" /><br></br>
      <label htmlFor="lastName">Last Name:</label>
      <input className="lastName" onChange={(e) => { setLastName(e.target.value); setProfileEdited(true); }} value={userLastName} placeholder="Last Name" /><br></br>
      <label htmlFor="username">Username:</label>
      <input className="username" onChange={(e) => { setUsername(e.target.value); setProfileEdited(true); }} value={userUsername} placeholder="Username" /><br></br>
      <label htmlFor="email">Email:</label>
      <input className="email" disabled value={userEmail} /><br></br>
      <label htmlFor="primaryHouse">Primary House:</label>
        {
          userPrimaryHouse !== null && houseList !== null
            ? <>
                <select className="primaryHouse" onChange={(e) => { setPrimaryHouse(parseInt(e.target.value)); setProfileEdited(true); }} value={userPrimaryHouse || ''}>
                  {
                    houseList.map((house) => <option key={house.id} value={house.id}>{house.name}</option>)
                  }
                </select>
              </>
            : userPrimaryHouse == null && houseList !== null
              ? <>
                  <select className="primaryHouse" onChange={(e) => { setPrimaryHouse(parseInt(e.target.value)); setProfileEdited(true); }} value={userPrimaryHouse || ''}>
                    <option value={0}>Select a primary house</option>
                    {
                      houseList.map((house) => <option key={house.id} value={house.id}>{house.name}</option>)
                    }
                  </select>
                </>
              : houseList == null
                ? <><p>No homes</p><button type="submit" onClick={() => { setShowAddHomeModal(true); }}>Add home</button></>
                : <></>
        }
        {
          profileEdited == true ? <><br></br><button type="submit" onClick={() => { submitEdits(); }}>Submit Edits</button></> : <></>
        }
      <AddHomeModal user={authenticatedUser} show={showAddHomeModal} setShowModal={setShowAddHomeModal} newHouseAdded={setNewHouseAdded} />
    </div>

  );
}

export default Profile;
