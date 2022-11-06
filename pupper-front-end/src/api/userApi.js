const UserApi = {
  ValidateUser: async (uid, token) => {
    await fetch(`https://localhost:7176/Auth/${uid}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default UserApi;
