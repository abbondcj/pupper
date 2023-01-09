import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import ActivityApi from '../api/ActivityApi';
import PupsApi from '../api/PupsApi';

/* eslint-disable */
function EditPupModal({ show, user, setShowModal, pupSelected, setPupSelected, houses, triggerEditPup, triggerDeletePup }) {
  const [pupName, setPupName] = useState(null);
  const [pupHouseId, setPupHouseId] = useState(null);
  const [pupBreed, setPupBreed] = useState(null);
  const [pupGender, setPupGender] = useState(null);
  const [pupBirthday, setPupBirthday] = useState(null);
  const [editsMade, setEditsMade] = useState(false);
  const ownerId = user.id;
  // const token = user.Aa;
  const editPup = () => {
    const editedPup = {
      /* eslint-disable */
      ownerId: parseInt(ownerId),
      houseId: pupHouseId,
      name: pupName,
      breed: pupBreed,
      gender: pupGender,
      birthday: pupBirthday
    }
    if (editedPup.name == '' || editedPup.ownerId == null || editedPup.breed == '' ) {
      window.alert("Name and Breed must have values");
    } else {
      PupsApi.EditPup(editedPup, pupSelected, user.Aa)
      setEditsMade(false);
      setPupSelected(null);
      triggerEditPup(true);
      setShowModal(false);
    }
  };

  const cancelEditPup = () => {
    setEditsMade(false);
    setPupName(null);
    setPupHouseId(null);
    setPupBreed(null);
    setPupGender(null);
    setPupBirthday(null);
    setPupSelected(null);
    setShowModal(false);
  };

  const deletePup = (id) => {
    const result = window.confirm("This will delete all associated activities, are you sure?")
    if (result) {
      ActivityApi.GetActivitiesByPupId(id, user.Aa)
        .then((data) => {
          if (data !== null) {
            data.map((activity) => {
              ActivityApi.DeleteActivity(activity.id, user.Aa);
            });
          }
        });
      PupsApi.DeletePup(id, user.Aa);
      setEditsMade(false);
      setPupSelected(null);
      setShowModal(false);
      triggerDeletePup(true);
    }
  }

  useEffect(
    () => {
      if (pupSelected !== null) {
        PupsApi.GetPupById(pupSelected, user.Aa)
          .then((data) => {
            setPupName(data.name);
            setPupHouseId(data.houseId);
            setPupBreed(data.breed);
            setPupGender(data.gender);
            if (data.birthday !== null) {
              const [birthday,] = data.birthday.split("T");
              setPupBirthday(birthday);
            } else {
              setPupBirthday(null);
            }
          });
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
          <h1>Edit Pup</h1>
        </Modal.Header>
        <Modal.Body className="modal__body">
          <div>
            <label htmlFor="pupName">Name:</label>
            {/* eslint-disable */}
            <input name="pupName" placeholder="Name" value={pupName || ''} onChange={(e) => { setPupName(e.target.value); setEditsMade(true); }} /><br></br>
            <label htmlFor="houseSelect">House: </label>
            <select value={pupHouseId || ''} className="houseSelect" onChange={(e) => { setPupHouseId(parseInt(e.target.value)); setEditsMade(true); }}>
              { houses !== null 
                ? houses.map((house) => <option key={house.id} value={house.id || ''}>{house.name}</option>) 
                : <></>
              }
            </select><br></br>
            <label htmlFor="breed">Breed:</label>
            <input value={pupBreed || ''} name="breed" placeholder="Breed" onChange={(e) => { setPupBreed(e.target.value); setEditsMade(true); }} /><br></br>
            <label htmlFor="gender">Gender:</label><br></br>
            {
              pupGender !== null && pupGender == 1
                ? <>
                    <p>M</p><input checked value={1} onClick={(e) => { setPupGender(parseInt(e.target.value)); setEditsMade(true); }} type="radio" name="genderSelect" />
                    <p>F</p><input value={2} onClick={(e) => { setPupGender(parseInt(e.target.value)); setEditsMade(true); }} type="radio" name="genderSelect" /><br></br>
                  </>
                : pupGender !== null && pupGender == 2
                    ? <>
                        <p>M</p><input value={1} onClick={(e) => { setPupGender(parseInt(e.target.value)); setEditsMade(true); }} type="radio" name="genderSelect" />
                        <p>F</p><input checked value={2} onClick={(e) => { setPupGender(parseInt(e.target.value)); setEditsMade(true); }} type="radio" name="genderSelect" /><br></br>
                      </>
                    : <>
                        <p>M</p><input value={1} onClick={(e) => { setPupGender(parseInt(e.target.value)); setEditsMade(true); }} type="radio" name="genderSelect" />
                        <p>F</p><input value={2} onClick={(e) => { setPupGender(parseInt(e.target.value)); setEditsMade(true); }} type="radio" name="genderSelect" /><br></br>
                      </>
            }
            <label htmlFor="pupBirthday">Birthday:</label>
            <input value={pupBirthday || ''} type="date" name="pupBirthday" placeholder="Birthday" onChange={(e) => { setPupBirthday(e.target.value); setEditsMade(true); }} /><br></br>
          </div>
          {
            editsMade
              ? <button type="submit" className="btn__btn-primary" onClick={() => { editPup(); setShowModal(false); }}>Submit Edits</button>
              : <></>
          }
          {
            editsMade
              ? <></>
              : <button type="submit" value={pupSelected} onClick={(e) => { deletePup(e.target.value); }}>Delete</button>
          }
          <button type="submit" className="btn__btn-primary" onClick={cancelEditPup}>Cancel</button>
        </Modal.Body>
      </Modal>
    );
  }
  return <></>;
}

export default EditPupModal;
