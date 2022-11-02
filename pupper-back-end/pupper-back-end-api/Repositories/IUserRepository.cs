using pupper_back_end_api.Models;

namespace pupper_back_end_api.Repositories
{
    public interface IUserRepository
    {
        List<User> GetAllUsers();

        User GetUserById(int id);
        User GetUserByFirebaseId(string firebaseId);
        public void AddUser(User user);
        public void DeleteUser(int id);
        public void UpdateUser(int id, User user);
    }
}
