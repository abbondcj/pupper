import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import ActivityApi from '../api/ActivityApi';
import activities from '../api/ActivityList';

/* eslint-disable */
function EditActivityDetailModal({ show, authdUser, setShowModal, activityEditId, houses, pups, setShowDetails, setActivityId }) {
  const [typeId, setActivityTypeId] = useState(null);
  const [activityObj, setActivityObj] = useState(null);
  const [editsMade, setEditsMade] = useState(false);
  const [activityPupId, setPupId] = useState(null);
  const [activityHouseId, setHouseId] = useState(null);
  const [houseList, setHouseList] = useState(houses);
  const [pupsList, setPupsList] = useState(pups);
  const [houseName, setHouseName] = useState(null);
  const [activityUserId, setActivityUserId] = useState(authdUser.id);
  const [activityDateTime, setDateTime] = useState(null);
  const [activityDescription, setDescription] = useState(null);

  const cancel = () => {
    setShowModal(false);
    setEditsMade(false);
    setShowDetails(true);
  };

  const deleteActivity = (id) => {
    ActivityApi.DeleteActivity(id, authdUser.Aa);
    setActivityId(null);
    setEditsMade(false);
  }

  const submitEdits = () => {
    const editedActivity = {
        pupId: activityPupId,
        houseId: activityHouseId,
        activityTypeId: typeId,
        userId: activityUserId,
        dateTime: activityDateTime,
        description: activityDescription,
    }
    if (editedActivity.pupId == null || editedActivity.houseId == null || editedActivity.activityTypeId == null || activityUserId == null) {
        window.location.alert("Pup, House, Activity Type, and User must have values")
    } else {
        ActivityApi.EditActivity(editedActivity, activityEditId, authdUser.Aa)
        setEditsMade(false);
        setShowModal(false);
        setShowDetails(true);
    }
  }

  const setPupAndHouse = (valueString) => {
    const [pupId, houseId] = valueString.split("-");
    setPupId(parseInt(pupId));
    const houseMatch = houseList.find(house => parseInt(house.id) == parseInt(houseId));
    setHouseId(houseMatch.id);
    setHouseName(houseMatch.name);
    setEditsMade(true);
  }

  useEffect(
    () => {
      if (activityEditId !== null) {
        setHouseList(houses);
        setPupsList(pups);
        ActivityApi.GetActivityById(activityEditId, authdUser.Aa)
          .then((data) => {
            setActivityObj(data);
            setActivityTypeId(data.activityTypeId);
            setPupId(data.pupId);
            setHouseId(data.houseId);
            setActivityUserId(data.userId);
            setDateTime(data.dateTime);
            setDescription(data.description)
            setHouseName(data.house.name);
          })
        }
    }, [activityEditId, show],
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
          <h1>Edit Activity</h1>
        </Modal.Header>
        <Modal.Body className="modal__body">
          <div>
              <label htmlFor="pupSelect">Pup: </label>
              <select className="pupSelect" onChange={(e) => { setPupAndHouse(e.target.value); }} value={`${activityPupId}-${activityHouseId}`}>
                {
                  pupsList !== null 
                    ? pupsList.map((pup) => <option key={pup.id} value={`${pup.id}-${pup.houseId}`}>{pup.name}</option>)
                    : <></>
                }
              </select><br></br>
              <label htmlFor="houseName">House: </label>
              <input disabled className="houseName" value={houseName || ''} /><br></br>
              <label htmlFor="human">Human:</label>
              <input className="human" disabled value={activityObj.user.firstName + ` ` + activityObj.user.lastName}/><br></br>
              <label htmlFor="activitySelect">Activity: </label>
              <select className="activitySelect" value={typeId || ''} onChange={(e) => { setActivityTypeId(parseInt(e.target.value)); setEditsMade(true); }}>
                {
                    activities.map((activity) => <option key={activity.id} value={activity.id}>{activity.name}</option>)
                }
              </select><br></br>
              <label htmlFor="dateTime">Date/Time:</label><br></br>
              <input value={activityDateTime || ''} type="dateTime-local" onChange={(e) => { setDateTime(e.target.value); setEditsMade(true); }} /><br></br>
              <label htmlFor="description">Description:</label><br></br>
              <textarea value={activityDescription || ''} className="description" placeholder="Description" onChange={(e) => { setDescription(e.target.value); setEditsMade(true); }}/><br></br>
          </div>
          {
            editsMade
             ? <button onClick={submitEdits} type="submit">Submit Edits</button>
             : <></>
          }
          {
            editsMade
              ? <></>
              : <button type="submit" value={activityEditId} onClick={(e) => { deleteActivity(parseInt(e.target.value)); setShowModal(false); }}>Delete</button>
          }
          <button type="submit" className="btn__btn-primary" onClick={cancel}>Cancel</button>
        </Modal.Body>
      </Modal>
    );
  }
  return <></>;
}

export default EditActivityDetailModal;
