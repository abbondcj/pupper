import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import HouseApi from '../api/HouseApi';
import ActivityApi from '../api/ActivityApi';
import PupsApi from '../api/PupsApi';
// TO DO -- Set up filters, sorting capabilities
//       -- Manage filters in state, set up props to be passed in for pre-filtering

function ActivityFilter({ user, pupPreFilter, housePreFilter }) {
  const [activitiesList, setActivities] = useState([]);
  const [houseList, setHouses] = useState([]);
  const [pupList, setPupList] = useState([]);
  const [pupFilter, setPupFilter] = useState(pupPreFilter !== null ? pupPreFilter : 0);
  const [houseFilter, setHouseFilter] = useState(housePreFilter !== null ? housePreFilter : 0);

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
        let activityCopy = activitiesList;
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
        <select onChange={(e) => {setPupFilter(parseInt(e.target.value)); }}>
          <option value={0}>All pups</option>
          {
            pupList !== null
              ? pupList.map((pup) => pupFilter == pup.id ? <option selected key={pup.id} value={pup.id}>{pup.name}</option> : <option key={pup.id} value={pup.id}>{pup.name}</option>)
              : ''
          }
        </select>
        <select onChange={(e) => {setHouseFilter(parseInt(e.target.value)); }}>
          <option value={0}>All Houses</option>
          {
            houseList !== null
              ? houseList.map((house) => houseFilter == house.id ? <option selected key={house.id} value={house.id}>{house.name}</option> : <option key={house.id} value={house.id}>{house.name}</option>)
              : ''
          }
        </select>
      </div>
      <Table className="table-primary align-middle table-hover">
        <thead>
          <tr>
            <th itemScope="col">#</th>
            <th itemScope="col">Pup</th>
            <th itemScope="col">House</th>
            <th itemScope="col">Activity</th>
            <th itemScope="col">Human</th>
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
                  <td>{activity.user.firstName} {activity.user.lastName}</td>
                  <td>{activity.dateTime}</td>
                  <td>
                    <button value={activity.id} type="submit">Details</button>
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
                    <td>{activity.user.firstName} {activity.user.lastName}</td>
                    <td>{activity.dateTime}</td>
                    <td>
                      <button value={activity.id} type="submit">Details</button>
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
                    <td>{activity.user.firstName} {activity.user.lastName}</td>
                    <td>{activity.dateTime}</td>
                    <td>
                      <button value={activity.id} type="submit">Details</button>
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
                    <td>{activity.pup.name}</td>
                    <td>{activity.house.name}</td>
                    <td>{activity.activityType.name}</td>
                    <td>{activity.user.firstName} {activity.user.lastName}</td>
                    <td>{activity.dateTime}</td>
                    <td>
                      <button value={activity.id} type="submit">Details</button>
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
    </div>
  );
}

export default ActivityFilter;