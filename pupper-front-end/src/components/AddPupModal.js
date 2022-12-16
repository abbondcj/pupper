import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import HouseApi from '../api/HouseApi';
import PupsApi from '../api/PupsApi';

/* eslint-disable */
function AddPupModal({ show, user, setShowModal, houseSelected, showHomeDetail }) {
  const [houseList, setHouseList] = useState(null);
  const [pupName, setPupName] = useState(null);
  const [pupHouse, setPupHouse] = useState(houseSelected !== null ? houseSelected : null);
  const [pupBreed, setPupBreed] = useState(null);
  const [pupGender, setPupGender] = useState(null);
  const [pupAgeYears, setPupAgeYears] = useState(null);
  const [pupAgeMonths, setPupAgeMonths] = useState(null);
  const ownerId = user.id;
  // const token = user.Aa;
  const addPup = () => {
    const newPup = {
      /* eslint-disable */
      ownerId: parseInt(ownerId),
      houseId: pupHouse,
      name: pupName,
      breed: pupBreed,
      gender: pupGender,
      ageYears: parseInt(pupAgeYears == NaN ? null : pupAgeYears),
      ageMonths: parseInt(pupAgeMonths == NaN ? null : pupAgeMonths)
    }
    if (newPup.name == null || newPup.ownerId == null || newPup.breed == null ) {
      window.alert("House and Name must have values");
    } else {
      PupsApi.AddPup(newPup, user.Aa)
      setShowModal(false);
    }
  };

  const cancelAddPup = () => {
    setHouseList(null);
    setPupName(null);
    setPupHouse(null);
    setPupBreed(null);
    setPupGender(null);
    setPupAgeYears(null);
    setPupAgeMonths(null);
    setShowModal(false);
    if (houseSelected !== null) {
      showHomeDetail(true);
    }
  };

  useEffect(
    () => {
      HouseApi.GetHousesByUserId(user.id, user.Aa)
        .then((data) => {
          setHouseList(data);
        });
      setPupHouse(houseSelected);
    }, [show]
  );  

  if (show) {
    return (
      <Modal
        show
        size="lg"
        centered
        className="modal__delete"
      >
        <Modal.Header className="modal__header">
          <h1>Add Pup</h1>
        </Modal.Header>
        <Modal.Body className="modal__body">
          <div>
            <label htmlFor="pupName">Name:</label>
            {/* eslint-disable */}
            <input name="pupName" placeholder="Name" onChange={(e) => { setPupName(e.target.value); }} /><br></br>
            {
                houseSelected !== null 
                ? <><label htmlFor="houseSelect">House:</label>{houseList.map((house) => { if (house.id == houseSelected) { return (<input key={house.id} disabled value={house.name} placeholder={house.name} />)}})}<br></br></>
                : <><label>House:</label><select onChange={(e) => { setPupHouse(parseInt(e.target.value)); }}><option value={0}>Select a house</option>{ houseList.map((house) => <option key={house.id} value={house.id}>{house.name}</option>) }</select><br></br></>
            }
            <label htmlFor="breed">Breed:</label>
            <input name="breed" placeholder="Breed" onChange={(e) => { setPupBreed(e.target.value); }} /><br></br>
            <label htmlFor="gender">Gender:</label><br></br>
            <p>M</p><input value={1} onClick={(e) => { setPupGender(parseInt(e.target.value)); }} type="radio" name="genderSelect" />
            <p>F</p><input value={2} onClick={(e) => { setPupGender(parseInt(e.target.value)); }} type="radio" name="genderSelect" /><br></br>
            <label htmlFor="pupAgeYears">Age years:</label>
            <input type="number" name="pupAgeYears" placeholder="Age years" onChange={(e) => { setPupAgeYears(e.target.value); }} /><br></br>
            <label htmlFor="pupAgeMonths">Age months:</label>
            <input type="number" name="pupAgeMonths" placeholder="Age months" onChange={(e) => { setPupAgeMonths(e.target.value); }} />
          </div>
          <button type="submit" className="btn__btn-primary" onClick={() => { addPup(); }}>Add Pup</button>
          <button type="submit" className="btn__btn-primary" onClick={cancelAddPup}>Cancel</button>
        </Modal.Body>
      </Modal>
    );
  }
  return <></>;
}

export default AddPupModal;
