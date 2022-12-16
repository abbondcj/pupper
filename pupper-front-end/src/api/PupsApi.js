const PupsApi = {
  GetPupsByHouseId: async (houseId, token) => {
    const result = await fetch(`https://localhost:7176/Pup/house/${houseId}`, {
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
  GetPupsByOwnerId: async (ownerId, token) => {
    const result = await fetch(`https://localhost:7176/Pup/owner/${ownerId}`, {
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
  AddPup: (pup, token) => {
    fetch('https://localhost:7176/Pup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(pup),
    });
  },
  GetPupById: async (pupId, token) => {
    const result = await fetch(`https://localhost:7176/Pup/${pupId}`, {
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
};

export default PupsApi;
