using Microsoft.Data.SqlClient;
using pupper_back_end_api.Models;

namespace pupper_back_end_api.Repositories
{
    public class UserRepository : IUserRepository
    {

        private readonly IConfiguration _config;

        public UserRepository(IConfiguration config)
        {
            _config = config;
        }

        public SqlConnection Connection
        {
            get
            {
                return new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            }
        }

        public void AddUser(User user)
        {
            throw new NotImplementedException();
        }

        public void DeleteUser(int id)
        {
            throw new NotImplementedException();
        }

        public List<User> GetAllUsers()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT 
                                            id,
                                            firebaseId, 
	                                        email, 
	                                        firstName, 
	                                        lastName, 
	                                        username,
                                            primaryHouseId
                                        FROM [dbo].[User]
                                       ";
                
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<User> users = new List<User>();
                        while (reader.Read())
                        {
                            User user = new User()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("id")),
                                FirebaseId = reader.GetString(reader.GetOrdinal("firebaseId")),
                                Email = reader.GetString(reader.GetOrdinal("email")),
                                FirstName = reader.GetString(reader.GetOrdinal("firstName")),
                                LastName = reader.GetString(reader.GetOrdinal("lastName")),
                                Username = reader.GetString(reader.GetOrdinal("username")),
                                PrimaryHouseId = reader.GetInt32(reader.GetOrdinal("primaryHouseId"))
                            };
                            users.Add(user);
                        }
                        return users;
                    }
                }

            }
        }

        public User GetUserByFirebaseId(string firebaseId)
        {
            throw new NotImplementedException();
        }

        public User GetUserById(int id)
        {
            throw new NotImplementedException();
        }

        public void UpdateUser(int id, User user)
        {
            throw new NotImplementedException();
        }
    }
}
