const PupsApi = {
  GetPupsByHouseId: async (houseId, token) => {
    const result = await fetch(`https://localhost:7176/Pup/house/${houseId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonResult = await result.json();
    return jsonResult;
  },
};

export default PupsApi;
