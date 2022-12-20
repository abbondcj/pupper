import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import HouseApi from '../api/HouseApi';
import PupsApi from '../api/PupsApi';

/* eslint-disable */
function HomeDetailModal({ show, user, setShowModal, houseId, setHomeToEdit, showEditModal, houseToAddPup, showAddPup }) {
  const [homeName, setHomeName] = useState();
  const [address1, setAddress1] = useState(null);
  const [address2, setAddress2] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zip, setZip] = useState(null);
  const [pupList, setPupList] = useState(null);
  const goBack = () => {
    setHomeName(null);
    setAddress1(null);
    setAddress2(null);
    setCity(null);
    setZip(null);
    setShowModal(false);
  }

  useEffect(
    () => {
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
            setPupList(data);
          })
      }
    }, [show, showAddPup, houseId, houseToAddPup]
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
          <h1>{homeName}</h1>
        </Modal.Header>
        <Modal.Body className="modal__body">
          <div>
            <h3>Details</h3>
            <p><b>Name: </b>{homeName || 'None'}</p>
            <p><b>Address 1: </b>{address1 || 'None'}</p>
            <p><b>Address 2: </b>{address2 || 'None'}</p>
            <p><b>City: </b>{city || 'None'}</p>
            <p><b>State: </b>{state || 'None'}</p>
            <p><b>Zip: </b>{zip || 'None'}</p>
          </div>
          <div>
            <h3>Pups</h3>
            {
              pupList !== null 
                ? pupList.map((pup) => <p key={pup.id}>{pup.name}</p>)
                : <p>No Pups</p>
            }
          </div>
          <button value={houseId} type="submit" className="btn__btn-primary" onClick={(e) => { setShowModal(false); setHomeToEdit(parseInt(e.target.value)); showEditModal(true); }}>Edit House</button>
          <button value={houseId} type="submit" onClick={(e) => { houseToAddPup(parseInt(e.target.value)); setShowModal(false); showAddPup(true); }}>Add Pup</button>
          <button type="submit" className="btn__btn-primary" onClick={goBack}>Back</button>
        </Modal.Body>
      </Modal>
    );
  }
  return <></>;
}

export default HomeDetailModal;
