const ActivityApi = {
  GetActivitiesByHouseId: async (houseId, token) => {
    const result = await fetch(`https://localhost:7176/Activity/house/${houseId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (result.status !== 200) {
      return null;
    }
    const jsonResult = await result.json();
    return jsonResult;
  },
  GetActivitiesByPupId: async (pupId, token) => {
    const result = await fetch(`https://localhost:7176/Activity/pup/${pupId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (result.status !== 200) {
      return null;
    }
    const jsonResult = await result.json();
    return jsonResult;
  },
  AddActivity: (activity, token) => {
    fetch('https://localhost:7176/Activity', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(activity),
    });
  },
  GetActivityById: async (activityId, token) => {
    const result = await fetch(`https://localhost:7176/Activity/${activityId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (result.status !== 200) {
      return null;
    }
    const jsonResult = await result.json();
    return jsonResult;
  },
  EditActivity: (activity, id, token) => {
    fetch(`https://localhost:7176/Activity/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(activity),
    });
  },
  DeleteActivity: (id, token) => {
    fetch(`https://localhost:7176/Activity/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default ActivityApi;
