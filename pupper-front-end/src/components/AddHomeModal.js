import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import HouseApi from '../api/HouseApi';

/* eslint-disable */
function AddHomeModal({ show, user, setShowModal }) {
  const [homeName, setHomeName] = useState(null);
  const [address1, setAddress1] = useState(null);
  const [address2, setAddress2] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zip, setZip] = useState(null);
  const ownerId = user.id;
  const token = user.Aa;
  const addHouse = () => {
    const newHome = {
      name: homeName,
      /* eslint-disable */
      houseOwnerId: parseInt(ownerId),
      joinCode: 123123,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      zip: zip
    }
    if (newHome.name == null || newHome.houseOwnerId == null || newHome.address1 == null || newHome.city == null || newHome.state == null || newHome.zip == null) {
      window.alert("Please enter a house name")
    } else {
      HouseApi.AddHouse(newHome, token);
    }
  };

  const cancelAddNewHome = () => {
    setHomeName(null);
    setAddress1(null);
    setAddress2(null);
    setCity(null);
    setZip(null);
    setShowModal(false);
  }

  if (show) {
    return (
      <Modal
        show
        size="lg"
        centered
        className="modal__delete"
      >
        <Modal.Header className="modal__header">
          <h1>Add Home</h1>
        </Modal.Header>
        <Modal.Body className="modal__body">
          <div>
            <label htmlFor="houseName">Name:</label>
            {/* eslint-disable */}
            <input name="houseName" placeholder="Name" onChange={(e) => { setHomeName(e.target.value); }} /><br></br>
            <label htmlFor="address1">Address 1:</label>
            <input name="address1" placeholder="Address 1" onChange={(e) => { setAddress1(e.target.value); }} /><br></br>
            <label htmlFor="address2">Address 2:</label>
            <input name="address2" placeholder="Address 2" onChange={(e) => { setAddress2(e.target.value); }} /><br></br>
            <label htmlFor="city">City:</label>
            <input name="city" placeholder="City" onChange={(e) => { setCity(e.target.value); }} /><br></br>
            <label htmlFor="state">State</label>
            <input name="state" placeholder="State" onChange={(e) => { setState(e.target.value); }} /><br></br>
            <label htmlFor="zip">Zip:</label>
            <input name="zip" placeholder="Zip" onChange={(e) => { setZip(e.target.value); }} /><br></br>
          </div>
          <button type="submit" className="btn__btn-primary" onClick={() => { addHouse(); setShowModal(false); }}>Add House</button>
          <button type="submit" className="btn__btn-primary" onClick={cancelAddNewHome}>Cancel</button>
        </Modal.Body>
      </Modal>
    );
  }
  return <></>;
}

export default AddHomeModal;
