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
        public User GetUserByFirebaseId(string firebaseId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT  id, 
												firebaseId, 
												email, 
												firstName, 
												lastName, 
												username,
                                                primaryHouseId
								FROM [dbo].[User]
                                WHERE firebaseId = @FirebaseId
							  ";


                    cmd.Parameters.AddWithValue("@FirebaseId", firebaseId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            User user = new User()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("id")),
                                FirebaseId = reader.GetString(reader.GetOrdinal("firebaseId")),
                                Email = reader.GetString(reader.GetOrdinal("email")),
                                FirstName = reader[(reader.GetOrdinal("firstName"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("firstName")),
                                LastName = reader[(reader.GetOrdinal("lastName"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("lastName")),
                                Username = reader[(reader.GetOrdinal("username"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("username")),
                                PrimaryHouseId = reader[(reader.GetOrdinal("primaryHouseId"))] == DBNull.Value ? null : reader.GetInt32(reader.GetOrdinal("primaryHouseId")),
                            };
                            return user;
                        }
                        else
                        {
                            return null;
                        }
                    }

                }
            }
        }

        public User GetUserById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT  
                                                id, 
												firebaseId, 
												email, 
												firstName, 
												lastName, 
												username,
                                                primaryHouseId
										FROM [dbo].[User] 
										WHERE id = @id
									  ";

                    cmd.Parameters.AddWithValue("@id", id);


                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            User user = new User()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("id")),
                                FirebaseId = reader.GetString(reader.GetOrdinal("firebaseId")),
                                Email = reader.GetString(reader.GetOrdinal("email")),
                                FirstName = reader[(reader.GetOrdinal("firstName"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("firstName")),
                                LastName = reader[(reader.GetOrdinal("lastName"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("lastName")),
                                Username = reader[(reader.GetOrdinal("username"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("username")),
                                PrimaryHouseId = reader[(reader.GetOrdinal("primaryHouseId"))] == DBNull.Value ? null : reader.GetInt32(reader.GetOrdinal("primaryHouseId"))
                            };
                            return user;
                        }
                        else
                        {
                            return null;
                        }
                    }

                }
            }
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
                                FirstName = reader[(reader.GetOrdinal("firstName"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("firstName")),
								LastName = reader[(reader.GetOrdinal("lastName"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("lastName")),
								Username = reader[(reader.GetOrdinal("username"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("username")),
                                PrimaryHouseId = reader[(reader.GetOrdinal("PrimaryHouseId"))] == DBNull.Value ? null : reader.GetInt32(reader.GetOrdinal("PrimaryHouseId"))
                            };
                            users.Add(user);
                        }
                        return users;
                    }
                }

            }
        }
        public void AddUser(User user)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
											INSERT INTO [dbo].[User] 
															(firebaseId,
															email, 
															firstName, 
															lastName, 
															username, 
															primaryHouseId)
											OUTPUT INSERTED.ID
											VALUES (@firebaseId, @email, @firstName, @lastName, @username, @primaryHouseId)
											";

                    cmd.Parameters.AddWithValue("@firebaseId", user.FirebaseId);
                    cmd.Parameters.AddWithValue("@email", user.Email);
                    cmd.Parameters.AddWithValue("@firstName", user.FirstName != null ? user.FirstName : DBNull.Value);
                    cmd.Parameters.AddWithValue("@lastName", user.LastName != null ? user.LastName : DBNull.Value);
                    cmd.Parameters.AddWithValue("@username", user.Username != null ? user.Username : DBNull.Value);
                    cmd.Parameters.AddWithValue("@primaryHouseId", user.PrimaryHouseId != null ? user.PrimaryHouseId : DBNull.Value);

                    int id = (int)cmd.ExecuteScalar();

                    user.Id = id;
                }
            }

        }

        public void DeleteUser(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
								DELETE FROM [dbo].[User]
								WHERE Id = @id
							 ";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void UpdateUser(int id, User user)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
										UPDATE [dbo].[User]
										SET [email] = @email,
                                            [firebaseId] = @firebaseId,
											[firstName] = @firstName,
											[lastName] = @lastName,
											[username] = @username,
											[primaryHouseId] = @primaryHouseId
								
										WHERE [id] = @id
										";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@email", user.Email);
                    cmd.Parameters.AddWithValue("@firebaseId", user.FirebaseId);
                    cmd.Parameters.AddWithValue("@firstName", user.FirstName);
                    cmd.Parameters.AddWithValue("@lastName", user.LastName);
                    cmd.Parameters.AddWithValue("@username", user.Username != null ? user.Username : DBNull.Value);
                    cmd.Parameters.AddWithValue("@primaryHouseId", user.PrimaryHouseId != null ? user.PrimaryHouseId : DBNull.Value);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
