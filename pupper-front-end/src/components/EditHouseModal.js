import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import ActivityApi from '../api/ActivityApi';
import HouseApi from '../api/HouseApi';
import PupsApi from '../api/PupsApi';

/* eslint-disable */
function EditHomeModal({ show, user, setShowModal, houseId, setShowDetail, setHomeToEdit, triggerDelete, triggerEdit, homeToView }) {
  const [homeName, setHomeName] = useState(null);
  const [housePupList, setHousePupList] = useState(null);
  const [address1, setAddress1] = useState(null);
  const [address2, setAddress2] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zip, setZip] = useState(null);
  const [editsMade, setEditsMade] = useState(false);
  const ownerId = user.id;
  const editHouse = () => {
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
    if (newHome.name == null || newHome.houseOwnerId == null) {
      window.alert("Please enter a house name")
    } else {
      HouseApi.EditHouse(newHome, houseId, user.Aa);
      setEditsMade(false);
      setHomeToEdit(null);
      setShowModal(false);
      triggerEdit(true);
      setShowDetail(true);
    }
  };

  const cancelEditHome = () => {
    setHomeName(null);
    setHomeToEdit(null);
    setAddress1(null);
    setAddress2(null);
    setCity(null);
    setZip(null);
    setEditsMade(false);
    setShowModal(false);
    setShowDetail(true);
  }

  const deleteHome = (id) => {
    const result = window.confirm("This will delete all associated pups and activities, are you sure?")
    if (result) {
      if (housePupList !== null) {
        housePupList.map((pup) => {
          ActivityApi.GetActivitiesByPupId(pup.id, user.Aa)
          .then((activities) => {
            if (activities !== null) {
              activities.map((activity) => {
                ActivityApi.DeleteActivity(activity.id, user.Aa)
              })
            }
          })
          PupsApi.DeletePup(parseInt(pup.id), user.Aa)
        });
        HouseApi.DeleteHouse(id, user.Aa);
        setHomeToEdit(null);
        triggerDelete(true);
        homeToView(null);
      } else {
        HouseApi.DeleteHouse(id, user.Aa)
        setHomeToEdit(null);
        triggerDelete(true);
        homeToView(null);
      }
    }
  }

  useEffect(
    () => {
      triggerEdit(false);
      if (houseId !== null) {
        HouseApi.GetHouseById(houseId, user.Aa)
        .then((data) => {
            setHomeName(data.name);
            setAddress1(data.address1);
            setAddress2(data.address2);
            setCity(data.city);
            setState(data.state);
            setZip(data.zip);
        });
        PupsApi.GetPupsByHouseId(houseId, user.Aa)
          .then((data) => {
            setHousePupList(data);
          })
      }
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
          <h1>Edit Home</h1>
        </Modal.Header>
        <Modal.Body className="modal__body">
          <div>
            <label htmlFor="houseName">Name:</label>
            {/* eslint-disable */}
            <input name="houseName" value={homeName || ""} placeholder="Name" onChange={(e) => { setHomeName(e.target.value); setEditsMade(true); }} /><br></br>
            <label htmlFor="address1">Address 1:</label>
            <input value={address1 || ""} name="address1" placeholder="Address 1" onChange={(e) => { setAddress1(e.target.value); setEditsMade(true); }} /><br></br>
            <label htmlFor="address2">Address 2:</label>
            <input value={address2 || ""} name="address2" placeholder="Address 2" onChange={(e) => { setAddress2(e.target.value); setEditsMade(true); }} /><br></br>
            <label htmlFor="city">City:</label>
            <input value={city || ""} name="city" placeholder="City" onChange={(e) => { setCity(e.target.value); setEditsMade(true); }} /><br></br>
            <label htmlFor="state">State</label>
            <input value={state || ""} name="state" placeholder="State" onChange={(e) => { setState(e.target.value); setEditsMade(true); }} /><br></br>
            <label htmlFor="zip">Zip:</label>
            <input value={zip || ""} name="zip" placeholder="Zip" onChange={(e) => { setZip(e.target.value); setEditsMade(true); }} /><br></br>
          </div>
          {
            editsMade
              ? <button type="submit" className="btn__btn-primary" onClick={() => { editHouse(); }}>Submit Edits</button>
              : <></>
          }
          {
            editsMade
              ? <></>
              : <button type="submit" value={houseId} onClick={(e) => { deleteHome(parseInt(e.target.value)); setShowModal(false); }}>Delete</button>
          }
          <button type="submit" className="btn__btn-primary" onClick={cancelEditHome}>Cancel</button>
        </Modal.Body>
      </Modal>
    );
  }
  return <></>;
}

export default EditHomeModal;
