using Microsoft.Data.SqlClient;
using pupper_back_end_api.Models;

namespace pupper_back_end_api.Repositories
{
    public class HouseMemberRepository : IHouseMemberRepository
    {
        private readonly IConfiguration _config;
        public HouseMemberRepository(IConfiguration config)
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
        public void AddHouseMember(HouseMember houseMember)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    INSERT INTO [dbo].[HouseMember]
                                                (userId,
                                                houseId)
                                    OUTPUT INSERTED.ID
                                    VALUES (@userId, @houseId)
                                       ";

                    cmd.Parameters.AddWithValue("@userId", houseMember.UserId);
                    cmd.Parameters.AddWithValue("@houseId", houseMember.HouseId);

                    int id = (int)cmd.ExecuteScalar();

                    houseMember.Id = id;
                }
            }
        }

        public void DeleteHouseMember(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
								DELETE FROM [dbo].[HouseMember]
								WHERE Id = @id
							 ";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<User> GetAllMembersByHouseId(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    SELECT 
                                        uTable.id AS userId, 
                                        uTable.firebaseId,
                                        uTable.email, 
                                        uTable.firstName, 
                                        uTable.lastName, 
                                        uTable.username, 
                                        uTable.primaryHouseId
                                    FROM [dbo].[HouseMember] hmTable 
                                    JOIN [dbo].[user] uTable 
                                    ON hmTable.userId = uTable.id
                                    JOIN [dbo].[House] hTable
                                    ON hmTable.houseId = hTable.id
                                    WHERE hmTable.houseId = @HouseId
                                       ";
                    cmd.Parameters.AddWithValue("@HouseId", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<User> result = new List<User>();
                        while (reader.Read())
                        {
                            User newUser = new User()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("userId")),
                                FirebaseId = "hidden",
                                Email = reader.GetString(reader.GetOrdinal("email")),
                                FirstName = reader[(reader.GetOrdinal("firstName"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("firstName")),
                                LastName = reader[(reader.GetOrdinal("lastName"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("lastName")),
                                Username = reader[(reader.GetOrdinal("username"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("username")),
                                PrimaryHouseId = reader[(reader.GetOrdinal("PrimaryHouseId"))] == DBNull.Value ? null : reader.GetInt32(reader.GetOrdinal("primaryHouseId"))
                            };
                            result.Add(newUser);
                        }
                        return result;
                    }
                }
            }
        }

        public List<House> GetAllHousesByUserId(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    SELECT  
                                        hTable.id AS houseId,
                                        hTable.houseOwnerId,
                                        hTable.name,
                                        hTable.joinCode,
                                        hTable.address1,
                                        hTable.address2,
                                        hTable.city,
                                        hTable.state,
                                        hTable.zip
                                    FROM [dbo].[HouseMember] hmTable
                                    JOIN [dbo].[House] hTable
                                    ON hmTable.houseId = hTable.id
                                    WHERE hmTable.userId = @MemberId
                                       ";
                    cmd.Parameters.AddWithValue("@MemberId", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<House> result = new List<House>();
                        while (reader.Read())
                        {
                            House newHouse = new House()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("houseId")),
                                HouseOwnerId = reader.GetInt32(reader.GetOrdinal("houseOwnerId")),
                                Name = reader.GetString(reader.GetOrdinal("name")),
                                JoinCode = 000000,
                                Address1 = reader[(reader.GetOrdinal("address1"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("address1")),
                                Address2 = reader[(reader.GetOrdinal("address2"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("address2")),
                                City = reader[(reader.GetOrdinal("city"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("city")),
                                State = reader[(reader.GetOrdinal("State"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("state")),
                                Zip = reader[(reader.GetOrdinal("zip"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("zip"))   
                            };
                            result.Add(newHouse);
                        }
                        return result;
                    }
                }
            }
        }

        public void UpdateHouseMember(int id, HouseMember houseMember)
        {
            throw new NotImplementedException();
        }
    }
}
