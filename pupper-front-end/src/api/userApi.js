const UserApi = {
  UserExists: async (uid, token) => {
    const result = await fetch(`https://localhost:7176/Auth/${uid}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonResult = await result.json();
    return jsonResult;
  },
  UpdateUser: async (userId, userObj, token) => {
    fetch(`https://localhost:7176/User/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userObj),
    });
  },
};

export default UserApi;
