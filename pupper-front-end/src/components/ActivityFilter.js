import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import '../styles/activity.css';
import HouseApi from '../api/HouseApi';
import ActivityApi from '../api/ActivityApi';
import PupsApi from '../api/PupsApi';
import ActivityDetailModal from './ActivityDetailModal';
import EditActivityDetailModal from './EditActivityDetailModal';

/* eslint-disable */
function ActivityFilter({ user, pupPreFilter, housePreFilter, showAddActivity }) {
  const [activitiesList, setActivities] = useState(null);
  const [houseList, setHouses] = useState([]);
  const [pupList, setPupList] = useState([]);
  const [pupFilter, setPupFilter] = useState(pupPreFilter !== null ? pupPreFilter : 0);
  const [houseFilter, setHouseFilter] = useState(housePreFilter !== null ? housePreFilter : 0);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [activityDetailId, setActivityDetailId] = useState(null);
  const [showEditActivityModal, setShowEditActivityModal] = useState(false);

  useEffect(
    () => {
      HouseApi.GetHousesByUserId(user.id, user.Aa)
        .then((data) => {
          setHouses(data);
        });
      PupsApi.GetPupsByOwnerId(user.id, user.Aa)
        .then((data) => {
          setPupList(data);
        });
    }, [showEditActivityModal, showDetailsModal, activityDetailId, showAddActivity],
  );

  useEffect(
    () => {
      setActivities(null);
      /* eslint-disable */
        let activityCopy = []
        houseList !== null
          ? houseList.map((house) => {
            ActivityApi.GetActivitiesByHouseId(house.id, user.Aa)
            .then((activityData) => {
              if (activityData !== null) {
                activityCopy = activityCopy.concat(activityData);
                setActivities(activityCopy);
              }
            })
          })
          : setActivities(null);
    }, [houseList]
  );

  return (
    <div className="activity-filter-component">
      <div className="filter-select">
        <select value={houseFilter} onChange={(e) => {setHouseFilter(parseInt(e.target.value)); }}>
          <option value={0}>All Houses</option>
          {
            houseList !== null
              ? houseList.map((house) => houseFilter == house.id ? <option key={house.id} value={house.id}>{house.name}</option> : <option key={house.id} value={house.id}>{house.name}</option>)
              : ''
          }
        </select>
        <select value={pupFilter} onChange={(e) => {setPupFilter(parseInt(e.target.value)); }}>
          <option value={0}>All pups</option>
          {
            pupList !== null
              ? pupList.map((pup) => pupFilter == pup.id ? <option key={pup.id} value={pup.id}>{pup.name}</option> : <option key={pup.id} value={pup.id}>{pup.name}</option>)
              : ''
          }
        </select>
        {
          pupFilter !== 0 || houseFilter !== 0 
           ? <button type="submit" onClick={() => { setPupFilter(0); setHouseFilter(0); }}>Reset</button>
           : <></>
        }
      </div>
      <Table id="activity-table" className="table-primary align-middle table-hover">
        <thead>
          <tr>
            <th itemScope="col">#</th>
            <th itemScope="col">Pup</th>
            <th itemScope="col">House</th>
            <th itemScope="col">Activity</th>
            <th itemScope="col">Date/Time</th>
            <th itemScope="col">Detail</th>
          </tr>
        </thead>
        <tbody>
          {
            pupFilter == 0 && houseFilter == 0 && activitiesList !== null ?
            activitiesList.map((activity, index) => {
              const dateString = activity.dateTime.substring(0, 16).replace("T", " || ")
              return (
                <tr key={activity.id} className="table-secondary" itemScope="row">
                  <td><b>{index + 1}</b></td>
                  <td>{activity.pup.name}</td>
                  <td>{activity.house.name}</td>
                  <td>{activity.activityType.name}</td>
                  <td>{dateString}</td>
                  <td>
                    <button onClick={(e) => { setActivityDetailId(parseInt(e.target.value)); setShowDetailsModal(true); }} value={activity.id} type="submit">Details</button>
                  </td>
                </tr>
              );
            })
            : 
            pupFilter !== 0 && houseFilter == 0 && activitiesList !== null ?
            activitiesList.map((activity, index) => {
              const dateString = activity.dateTime.substring(0, 16).replace("T", " || ")
              if (activity.pup.id == pupFilter) {
                return (
                  <tr key={activity.id} className="table-secondary" itemScope="row">
                    <td><b>{index + 1}</b></td>
                    <td>{activity.pup.name}</td>
                    <td>{activity.house.name}</td>
                    <td>{activity.activityType.name}</td>
                    <td>{dateString}</td>
                    <td>
                      <button onClick={(e) => { setActivityDetailId(parseInt(e.target.value)); setShowDetailsModal(true); }} value={activity.id} type="submit">Details</button>
                    </td>
                  </tr>
                );
              }
            })
            :
            pupFilter == 0 && houseFilter !== 0 && activitiesList !== null?
            activitiesList.map((activity, index) => {
              const dateString = activity.dateTime.substring(0, 16).replace("T", " || ")
              if (activity.house.id == houseFilter) {
                return (
                  <tr key={activity.id} className="table-secondary" itemScope="row">
                    <td><b>{index + 1}</b></td>
                    <td>{activity.pup.name}</td>
                    <td>{activity.house.name}</td>
                    <td>{activity.activityType.name}</td>
                    <td>{dateString}</td>
                    <td>
                      <button onClick={(e) => { setActivityDetailId(parseInt(e.target.value)); setShowDetailsModal(true); }} value={activity.id} type="submit">Details</button>
                    </td>
                  </tr>
                );
              }
            })
            :
            activitiesList !== null ? 
            activitiesList.map((activity, index) => {
              const dateString = activity.dateTime.substring(0, 16).replace("T", " || ")
              if (activity.pup.id == pupFilter && activity.house.id == houseFilter) {
                return (
                  <tr key={activity.id} className="table-secondary" itemScope="row">
                    <td><b>{index + 1}</b></td>
                    <td>{activity.pup.name}</td>
                    <td>{activity.house.name}</td>
                    <td>{activity.activityType.name}</td>
                    <td>{dateString}</td>
                    <td>
                      <button onClick={(e) => { setActivityDetailId(parseInt(e.target.value)); setShowDetailsModal(true); }} value={activity.id} type="submit">Details</button>
                    </td>
                  </tr>
                );
              }
            })
            : <></>
          }
        </tbody>
      </Table>
      <ActivityDetailModal show={showDetailsModal} authdUser={user} setShowModal={setShowDetailsModal} activityId={activityDetailId} setActivityId={setActivityDetailId} setShowEditModal={setShowEditActivityModal} />
      <EditActivityDetailModal authdUser={user} show={showEditActivityModal} setShowModal={setShowEditActivityModal} activityEditId={activityDetailId} setActivityId={setActivityDetailId} houses={houseList} pups={pupList} setShowDetails={setShowDetailsModal} />
    </div>
  );
}

export default ActivityFilter;
