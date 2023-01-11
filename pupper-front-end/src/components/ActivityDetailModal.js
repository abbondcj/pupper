import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import '../styles/modal.css';
import ActivityApi from '../api/ActivityApi';

/* eslint-disable */
function ActivityDetailModal({ show, authdUser, setShowModal, activityId, setActivityId, setShowEditModal }) {
  const [typeId, setActivityTypeId] = useState(activityId);
  const [activityObj, setActivityObj] = useState(null);

  const goBack = () => {
    setActivityObj(null);
    setActivityTypeId(null);
    setActivityId(null);
    setShowModal(false);
  };

  useEffect(
    () => {
      if (activityId !== null) {
        ActivityApi.GetActivityById(activityId, authdUser.Aa)
          .then((data) => {
            setActivityObj(data);
          });
      }
    }, [show],
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
          <h1>Activity Details</h1>
        </Modal.Header>
        <Modal.Body className="modal__body">
          {activityObj !== null
            ? <div>
              <p><b>Pup: </b>{activityObj.pup.name}</p>
              <p><b>House: </b>{activityObj.house.name}</p>
              <p><b>Activity: </b>{activityObj.activityType.name}</p>
              <p><b>Date/Time: </b>{activityObj.dateTime.substring(0, 16).replace("T", " || ")}</p>
              <p><b>Human: </b>{activityObj.user.firstName + ` ` + activityObj.user.lastName}</p>
              <p><b>Description: </b>{activityObj.description !== null ? activityObj.description : `None`}</p>
            </div>
            : <></>
          }
          <button onClick={(e) => { setShowModal(false); setShowEditModal(true); }} type="submit">Edit</button>
          <button type="submit" className="btn__btn-primary" onClick={goBack}>Back</button>
        </Modal.Body>
      </Modal>
    );
  }
  return <></>;
}

export default ActivityDetailModal;
