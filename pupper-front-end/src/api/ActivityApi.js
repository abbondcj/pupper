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
};

export default ActivityApi;
