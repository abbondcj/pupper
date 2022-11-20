using Microsoft.Data.SqlClient;
using pupper_back_end_api.Models;

namespace pupper_back_end_api.Repositories
{
    public class HouseRepository : IHouseRepository
    {
        private readonly IConfiguration _config;
        public HouseRepository(IConfiguration config)
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
        public void AddHouse(House house)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    INSERT INTO [dbo].[house]
                                        (houseOwnerId,
                                        name,
                                        joinCode,
                                        address1,
                                        address2,
                                        city,
                                        state,
                                        zip)
                                    OUTPUT INSERTED.ID
                                    VALUES (@houseOwnerId, @name, @joinCode, @address1, @address2, @city, @state, @zip)
                                       ";

                    cmd.Parameters.AddWithValue(@"houseOwnerId", house.HouseOwnerId);
                    cmd.Parameters.AddWithValue("@name", house.Name);
                    cmd.Parameters.AddWithValue("@joinCode", house.JoinCode);
                    cmd.Parameters.AddWithValue("@address1", house.Address1 != null ? house.Address1 : DBNull.Value);
                    cmd.Parameters.AddWithValue("address2", house.Address2 != null ? house.Address2 : DBNull.Value);
                    cmd.Parameters.AddWithValue("@city", house.City != null ? house.City : DBNull.Value);
                    cmd.Parameters.AddWithValue("@state", house.State != null ? house.State : DBNull.Value);
                    cmd.Parameters.AddWithValue("@zip", house.Zip != null ? house.Zip : DBNull.Value);

                    int id = (int)cmd.ExecuteScalar();

                    house.Id = id;
                }
            }
        }

        public void DeleteHouse(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    DELETE FROM [dbo].[house]
                                    WHERE Id = @id
                                       ";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<House> GetAllHousesByHouseOwnerId(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    SELECT
                                        id,
                                        houseOwnerId,
                                        name,
                                        joinCode,
                                        address1,
                                        address2,
                                        city,
                                        state,
                                        zip
                                    FROM [dbo].[house]
                                    WHERE houseOwnerId = @Id
                                      ";

                    cmd.Parameters.AddWithValue("@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<House> houses = new List<House>();
                        while (reader.Read())
                        {
                            House house = new House()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("id")),
                                HouseOwnerId = reader.GetInt32(reader.GetOrdinal("houseOwnerId")),
                                Name = reader.GetString(reader.GetOrdinal("name")),
                                JoinCode = reader.GetInt32(reader.GetOrdinal("joinCode")),
                                Address1 = reader[(reader.GetOrdinal("address1"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("address1")),
                                Address2 = reader[(reader.GetOrdinal("address2"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("address2")),
                                City = reader[(reader.GetOrdinal("city"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("city")),
                                State = reader[(reader.GetOrdinal("State"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("state")),
                                Zip = reader[(reader.GetOrdinal("zip"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("zip"))
                            };
                            houses.Add(house);
                        }

                        if (houses.Count == 0)
                        {
                            return null;
                        }
                        return houses;
                    }
                }
            }
        }

        public List<House> GetAllHousesByMemberId(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT h.id, 
                           h.houseOwnerId, 
                           h.name, 
                           h.joinCode,
                           h.address1,
                           h.address2, 
                           h.city, 
                           h.state, 
                           h.zip  
                    FROM [dbo].[house] h LEFT JOIN [dbo].[houseMember] hm 
                    ON h.id = hm.houseId
                    WHERE hm.userId = @Id
                    ";

                    cmd.Parameters.AddWithValue("@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<House> houses = new List<House>();
                        while (reader.Read())
                        {
                            House house = new House()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("id")),
                                HouseOwnerId = reader.GetInt32(reader.GetOrdinal("houseOwnerId")),
                                Name = reader.GetString(reader.GetOrdinal("name")),
                                JoinCode = reader.GetInt32(reader.GetOrdinal("joinCode")),
                                Address1 = reader[(reader.GetOrdinal("address1"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("address1")),
                                Address2 = reader[(reader.GetOrdinal("address2"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("address2")),
                                City = reader[(reader.GetOrdinal("city"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("city")),
                                State = reader[(reader.GetOrdinal("State"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("state")),
                                Zip = reader[(reader.GetOrdinal("zip"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("zip"))
                            };
                            houses.Add(house);
                        }

                        if (houses.Count == 0)
                        {
                            return null;
                        }

                        return houses;
                    }
                }
            }
        }

        public House GetHouseById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    SELECT
                                        id,
                                        houseOwnerId,
                                        name,
                                        joinCode,
                                        address1,
                                        address2,
                                        city,
                                        state,
                                        zip
                                    FROM [dbo].[house]
                                    WHERE id = @Id
                                      ";

                    cmd.Parameters.AddWithValue("@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            House house = new House()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("id")),
                                HouseOwnerId = reader.GetInt32(reader.GetOrdinal("houseOwnerId")),
                                Name = reader.GetString(reader.GetOrdinal("name")),
                                JoinCode = reader.GetInt32(reader.GetOrdinal("joinCode")),
                                Address1 = reader[(reader.GetOrdinal("address1"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("address1")),
                                Address2 = reader[(reader.GetOrdinal("address2"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("address2")),
                                City = reader[(reader.GetOrdinal("city"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("city")),
                                State = reader[(reader.GetOrdinal("State"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("state")),
                                Zip = reader[(reader.GetOrdinal("zip"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("zip"))
                            };

                            return house;
                        } else
                        {
                            return null;
                        }
                    }
                }
            }
        }

        public void UpdateHouse(int id, House house)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    UPDATE [dbo].[house]
                                    SET houseOwnerId = @houseOwnerId,
                                        name = @name,
                                        joinCode = @joinCode,
                                        address1 = @address1,
                                        address2 = @address2,
                                        city = @city,
                                        state = @state,
                                        zip = @zip
                                    WHERE Id = @id
                                      ";

                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@houseOwnerId", house.HouseOwnerId);
                    cmd.Parameters.AddWithValue("@name", house.Name);
                    cmd.Parameters.AddWithValue("@joinCode", house.JoinCode);
                    cmd.Parameters.AddWithValue("@address1", house.Address1 != null ? house.Address1 : DBNull.Value);
                    cmd.Parameters.AddWithValue("@address2", house.Address2 != null ? house.Address2 : DBNull.Value);
                    cmd.Parameters.AddWithValue("@city", house.City != null ? house.City : DBNull.Value);
                    cmd.Parameters.AddWithValue("@state", house.State != null ? house.State : DBNull.Value);
                    cmd.Parameters.AddWithValue("@zip", house.Zip != null ? house.Zip : DBNull.Value);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
