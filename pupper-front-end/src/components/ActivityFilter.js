import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import HouseApi from '../api/HouseApi';
import ActivityApi from '../api/ActivityApi';
import PupsApi from '../api/PupsApi';
import ActivityDetailModal from './ActivityDetailModal';
import EditActivityDetailModal from './EditActivityDetailModal';
// TO DO -- Set up filters, sorting capabilities
//       -- Manage filters in state, set up props to be passed in for pre-filtering

function ActivityFilter({ user, pupPreFilter, housePreFilter }) {
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
    }, [],
  );

  useEffect(
    () => {
      /* eslint-disable */
        let activityCopy = activitiesList == null ? [] : activitiesList;
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
    <div>
      <div>
        <select value={pupFilter} onChange={(e) => {setPupFilter(parseInt(e.target.value)); }}>
          <option value={0}>All pups</option>
          {
            pupList !== null
              ? pupList.map((pup) => pupFilter == pup.id ? <option key={pup.id} value={pup.id}>{pup.name}</option> : <option key={pup.id} value={pup.id}>{pup.name}</option>)
              : ''
          }
        </select>
        <select value={houseFilter} onChange={(e) => {setHouseFilter(parseInt(e.target.value)); }}>
          <option value={0}>All Houses</option>
          {
            houseList !== null
              ? houseList.map((house) => houseFilter == house.id ? <option key={house.id} value={house.id}>{house.name}</option> : <option key={house.id} value={house.id}>{house.name}</option>)
              : ''
          }
        </select>
        {
          pupFilter !== 0 || houseFilter !== 0 
           ? <button type="submit" onClick={() => { setPupFilter(0); setHouseFilter(0); }}>Reset</button>
           : <></>
        }
      </div>
      <Table className="table-primary align-middle table-hover">
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
              return (
                <tr key={activity.id} className="table-secondary" itemScope="row">
                  <td><b>{index + 1}</b></td>
                  <td>{activity.pup.name}</td>
                  <td>{activity.house.name}</td>
                  <td>{activity.activityType.name}</td>
                  <td>{activity.dateTime}</td>
                  <td>
                    <button onClick={(e) => { setActivityDetailId(parseInt(e.target.value)); setShowDetailsModal(true); }} value={activity.id} type="submit">Details</button>
                  </td>
                </tr>
              );
            })
            : 
            pupFilter !== 0 && houseFilter == 0 && activitiesList !== null ?
            activitiesList.map((activity, index) => {
              if (activity.pup.id == pupFilter) {
                return (
                  <tr key={activity.id} className="table-secondary" itemScope="row">
                    <td><b>{index + 1}</b></td>
                    <td>{activity.pup.name}</td>
                    <td>{activity.house.name}</td>
                    <td>{activity.activityType.name}</td>
                    <td>{activity.dateTime}</td>
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
              if (activity.house.id == houseFilter) {
                return (
                  <tr key={activity.id} className="table-secondary" itemScope="row">
                    <td><b>{index + 1}</b></td>
                    <td>{activity.pup.name}</td>
                    <td>{activity.house.name}</td>
                    <td>{activity.activityType.name}</td>
                    <td>{activity.dateTime}</td>
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
              if (activity.pup.id == pupFilter && activity.house.id == houseFilter) {
                return (
                  <tr key={activity.id} className="table-secondary" itemScope="row">
                    <td><b>{index + 1}</b></td>
                    <td>{activity.Pup.name}</td>
                    <td>{activity.house.name}</td>
                    <td>{activity.activityType.name}</td>
                    <td>{activity.dateTime}</td>
                    <td>
                      <button onClick={(e) => { setActivityDetailId(parseInt(e.target.value)); setShowDetailsModal(true); }} value={activity.id} type="submit">Details</button>
                    </td>
                  </tr>
                );
              }
            })
            : <tr>
              <td>--</td>
              <td>--</td>
              <td>--</td>
              <td>No activity</td>
              <td>--</td>
              <td>--</td>
              <td>--</td>
            </tr>
          }
        </tbody>
      </Table>
      <ActivityDetailModal show={showDetailsModal} authdUser={user} setShowModal={setShowDetailsModal} activityId={activityDetailId} setActivityId={setActivityDetailId} setShowEditModal={setShowEditActivityModal} />
      <EditActivityDetailModal authdUser={user} show={showEditActivityModal} setShowModal={setShowEditActivityModal} activityEditId={activityDetailId} houses={houseList} pups={pupList} setShowDetails={setShowDetailsModal} />
    </div>
  );
}

export default ActivityFilter;
