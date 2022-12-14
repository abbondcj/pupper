import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import ActivityApi from '../api/ActivityApi';
import activities from '../api/ActivityList';
import HouseApi from '../api/HouseApi';
import PupsApi from '../api/PupsApi';

/* eslint-disable */
function AddActivityModal({ show, user, setShowModal, pupChosen, houseChosen }) {
  const [activityPupId, setPupId] = useState(pupChosen !== undefined ? pupChosen : null);
  const [activityHouseId, setHouseId] = useState(houseChosen !== undefined ? houseChosen : null);
  const [houseList, setHouseList] = useState(null);
  const [pupList, setPupList] = useState(null);
  const [houseName, setHouseName] = useState(null);
  const [typeId, setActivityTypeId] = useState(null);
  const [activityUserId, setActivityUserId] = useState(user.id);
  const [activityDateTime, setDateTime] = useState(null);
  const [activityDescription, setDescription] = useState(null);
  const addActivity = () => {
    const newActivity = {
      pupId: activityPupId,
      houseId: activityHouseId,
      activityTypeId: typeId,
      userId: activityUserId,
      dateTime: activityDateTime,
      description: activityDescription
    };
    if (newActivity.pupId == null || newActivity.activityTypeId == null || newActivity.dateTime == null) {
      window.alert("Pup, Activity, and Date/Time must be selected");
    } else {
      ActivityApi.AddActivity(newActivity, user.Aa)
      setShowModal(false);
      window.location.reload();
    }
  };

  const setPupInfo = (valueString) => {
    const [pupId, houseId] = valueString.split("-");
    setPupId(parseInt(pupId));
    setHouseId(parseInt(houseId));
    if (parseInt(pupId) == 0) {
      setHouseName(null);
    };
    houseList.map((house) => {
        if (house.id == houseId) {
          setHouseName(house.name);
        };
    });
  };

  const cancelAddPup = () => {
    setPupId(null);
    setHouseId(null);
    setHouseList(null); 
    setPupList(null);
    setHouseName(null);
    setActivityTypeId(null);
    setActivityUserId(null);
    setDateTime(null);
    setDescription(null);
    setShowModal(false);
  };

  useEffect(
    () => {
      HouseApi.GetHousesByUserId(user.id, user.Aa)
        .then((data) => {
          setHouseList(data);
        });
    }, [],
  );

  useEffect(
    () => {
      PupsApi.GetPupsByOwnerId(user.id, user.Aa)
        .then((data) => {
          setPupList(data);
        });
    }, []
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
          <h1>Add Activity</h1>
        </Modal.Header>
        <Modal.Body className="modal__body">
          <div>
            {
              pupList !== null 
                ? <><label htmlFor="pupSelect">Pup:</label><select onChange={(e) => { setPupInfo(e.target.value); }}><option value={0}>Select a pup</option>{pupList.map((pup) => <option key={pup.id} value={`${pup.id}-${pup.houseId}`}>{pup.name}</option>)}</select><br></br></>
                : <button type="submit">Add Pup</button>
            }
            {houseName == null ? <><label htmlFor="houseSelect">House:</label><select className="houseSelect" onChange={(e) => { setHouseId(parseInt(e.target.value)); }}>{houseList.map((house) => <option key={house.id} value={house.id}>{house.name}</option>)}</select><br></br></> : <p>House: {houseName}</p>}
            {
              <>
                <label htmlFor="houseSelect">Activity:</label>
                <select className="activitySelect" onChange={(e) => { setActivityTypeId(parseInt(e.target.value)); }}>
                  <option value={0}>Select an activity</option>
                  {
                    activities.map((activity) => <option key={activity.id} value={activity.id}>{activity.name}</option>)
                  }
                </select><br></br>
              </>
            }
            <label htmlFor="dateTime">Date/Time:</label><br></br>
            <input type="datetime-local" onChange={(e) => { setDateTime(e.target.value); }} /><br></br>
            <label htmlFor="description">Description:</label><br></br>
            <textarea className="description" placeholder="Description" onChange={(e) => { setDescription(e.target.value); }}/><br></br>
          </div>
          <button type="submit" className="btn__btn-primary" onClick={() => { addActivity(); }}>Add Activity</button>
          <button type="submit" className="btn__btn-primary" onClick={cancelAddPup}>Cancel</button>
        </Modal.Body>
      </Modal>
    );
  }
  return <></>;
}

export default AddActivityModal;
