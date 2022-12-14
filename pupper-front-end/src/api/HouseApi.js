const HouseApi = {
  GetHousesByUserId: async (userId, token) => {
    const result = await fetch(`https://localhost:7176/House/owner/${userId}`, {
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
  GetHouseById: async (houseId, token) => {
    const result = await fetch(`https://localhost:7176/House/${houseId}`, {
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
  AddHouse: (house, token) => {
    fetch('https://localhost:7176/House', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(house),
    });
  },
  EditHouse: async (house, id, token) => {
    fetch(`https://localhost:7176/House/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(house),
    });
  },
  DeleteHouse: async (id, token) => {
    fetch(`https://localhost:7176/House/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default HouseApi;
