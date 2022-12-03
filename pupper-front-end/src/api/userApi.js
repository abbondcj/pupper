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
};

export default UserApi;
