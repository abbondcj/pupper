const UserApi = {
  UserExists: async (uid) => {
    const result = await fetch(`https://localhost:7176/Auth/${uid}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const jsonResult = await result.json();
    return jsonResult;
  },
};

export default UserApi;
