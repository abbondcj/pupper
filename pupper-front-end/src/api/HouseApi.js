const HouseApi = {
  GetHousesByUserId: async (userId, token) => {
    const result = await fetch(`https://localhost:7176/house/owner/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonResult = await result.json();
    return jsonResult;
  },
};

export default HouseApi;
