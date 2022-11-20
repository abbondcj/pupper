using Microsoft.Data.SqlClient;
using pupper_back_end_api.Models;

namespace pupper_back_end_api.Repositories
{
    public class PupRepository : IPupRepository
    {
        private readonly IConfiguration _config;
        public PupRepository(IConfiguration config)
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
        public void AddPup(Pup pup)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                     INSERT INTO [dbo].[pup]
                                        (ownerId,
                                        houseId,
                                        name,
                                        breed,
                                        gender,
                                        ageYears,
                                        ageMonths)
                                    OUTPUT INSERTED.ID
                                    VALUES (@ownerId, @houseId, @name, @breed, @gender, @ageYears, @ageMonths)
                                       ";

                    cmd.Parameters.AddWithValue("@ownerId", pup.OwnerId);
                    cmd.Parameters.AddWithValue("@houseId", pup.HouseId);
                    cmd.Parameters.AddWithValue("@name", pup.Name);
                    cmd.Parameters.AddWithValue("@breed", pup.Breed);
                    cmd.Parameters.AddWithValue("@gender", pup.Gender != null ? pup.Gender : DBNull.Value);
                    cmd.Parameters.AddWithValue("@ageYears", pup.AgeYears != null ? pup.AgeYears : DBNull.Value);
                    cmd.Parameters.AddWithValue("@ageMonths", pup.AgeMonths != null ? pup.AgeMonths : DBNull.Value);

                    int id = (int)cmd.ExecuteScalar();

                    pup.Id = id;
                }
            }
        }

        public void DeletePup(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    DELETE FROM [dbo].[pup]
                                    WHERE Id = @id
                                       ";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Pup> GetAllPups()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT
                                            id,
                                            ownerId,
                                            houseId,
                                            name,
                                            breed,
                                            gender,
                                            ageYears,
                                            ageMonths
                                        FROM [dbo].[Pup]
                                       ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Pup> pups = new List<Pup>();
                        while (reader.Read())
                        {
                            Pup pup = new Pup()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("id")),
                                OwnerId = reader.GetInt32(reader.GetOrdinal("ownerId")),
                                HouseId = reader.GetInt32(reader.GetOrdinal("houseId")),
                                Name = reader.GetString(reader.GetOrdinal("name")),
                                Breed = reader.GetString(reader.GetOrdinal("breed")),
                                Gender = reader[(reader.GetOrdinal("gender"))] == DBNull.Value ? 0 : reader.GetInt32(reader.GetOrdinal("gender")),
                                AgeYears = reader[(reader.GetOrdinal("ageYears"))] == DBNull.Value ? 0 : reader.GetInt32(reader.GetOrdinal("ageYears")),
                                AgeMonths = reader[(reader.GetOrdinal("ageMonths"))] == DBNull.Value ? 0 : reader.GetInt32(reader.GetOrdinal("ageMonths"))
                            };
                            pups.Add(pup);
                        }
                        return pups;
                    }
                }
            }
        }

        public List<Pup> GetPupsByHouseId(int id)
        {
            using (SqlConnection conn = Connection)
            {
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    conn.Open();
                    cmd.CommandText = @"
                                        SELECT
                                            id,
                                            ownerId,
                                            houseId,
                                            name,
                                            breed,
                                            gender,
                                            ageYears,
                                            ageMonths
                                        FROM [dbo].[Pup]
                                        WHERE houseId = @Id
                                       ";

                    cmd.Parameters.AddWithValue("@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Pup> pups = new List<Pup>();
                        while (reader.Read())
                        {
                            Pup pup = new Pup()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("id")),
                                OwnerId = reader.GetInt32(reader.GetOrdinal("ownerId")),
                                HouseId = reader.GetInt32(reader.GetOrdinal("houseId")),
                                Name = reader.GetString(reader.GetOrdinal("name")),
                                Breed = reader.GetString(reader.GetOrdinal("breed")),
                                Gender = reader[(reader.GetOrdinal("gender"))] == DBNull.Value ? 0 : reader.GetInt32(reader.GetOrdinal("gender")),
                                AgeYears = reader[(reader.GetOrdinal("ageYears"))] == DBNull.Value ? 0 : reader.GetInt32(reader.GetOrdinal("ageYears")),
                                AgeMonths = reader[(reader.GetOrdinal("ageMonths"))] == DBNull.Value ? 0 : reader.GetInt32(reader.GetOrdinal("ageMonths"))
                            };
                            pups.Add(pup);
                        }
                        if (pups.Count == 0)
                        {
                            return null;
                        }
                        return pups;
                    }
                }
            };
        }

        public Pup GetPupById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    conn.Open();
                    cmd.CommandText = @"
                                        SELECT
                                            id,
                                            ownerId,
                                            houseId,
                                            name,
                                            breed,
                                            gender,
                                            ageYears,
                                            ageMonths
                                        FROM [dbo].[Pup]
                                        WHERE id = @Id
                                       ";

                    cmd.Parameters.AddWithValue("@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Pup pup = new Pup()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("id")),
                                OwnerId = reader.GetInt32(reader.GetOrdinal("ownerId")),
                                HouseId = reader.GetInt32(reader.GetOrdinal("houseId")),
                                Name = reader.GetString(reader.GetOrdinal("name")),
                                Breed = reader.GetString(reader.GetOrdinal("breed")),
                                Gender = reader[(reader.GetOrdinal("gender"))] == DBNull.Value ? 0 : reader.GetInt32(reader.GetOrdinal("gender")),
                                AgeYears = reader[(reader.GetOrdinal("ageYears"))] == DBNull.Value ? 0 : reader.GetInt32(reader.GetOrdinal("ageYears")),
                                AgeMonths = reader[(reader.GetOrdinal("ageMonths"))] == DBNull.Value ? 0 : reader.GetInt32(reader.GetOrdinal("ageMonths"))
                            };
                            return pup;
                        } else
                        {
                            return null;
                        }
                    }
                }
            };
        }

        public List<Pup> GetPupsByOwnerId(int id)
        {
            using (SqlConnection conn = Connection)
            {
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    conn.Open();
                    cmd.CommandText = @"
                                        SELECT
                                            id,
                                            ownerId,
                                            houseId,
                                            name,
                                            breed,
                                            gender,
                                            ageYears,
                                            ageMonths
                                        FROM [dbo].[Pup]
                                        WHERE ownerId = @Id
                                       ";

                    cmd.Parameters.AddWithValue("@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Pup> pups = new List<Pup>();
                        while (reader.Read())
                        {
                            Pup pup = new Pup()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("id")),
                                OwnerId = reader.GetInt32(reader.GetOrdinal("ownerId")),
                                HouseId = reader.GetInt32(reader.GetOrdinal("houseId")),
                                Name = reader.GetString(reader.GetOrdinal("name")),
                                Breed = reader.GetString(reader.GetOrdinal("breed")),
                                Gender = reader[(reader.GetOrdinal("gender"))] == DBNull.Value ? 0 : reader.GetInt32(reader.GetOrdinal("gender")),
                                AgeYears = reader[(reader.GetOrdinal("ageYears"))] == DBNull.Value ? 0 : reader.GetInt32(reader.GetOrdinal("ageYears")),
                                AgeMonths = reader[(reader.GetOrdinal("ageMonths"))] == DBNull.Value ? 0 : reader.GetInt32(reader.GetOrdinal("ageMonths"))
                            };
                            pups.Add(pup);
                        }
                        if (pups.Count == 0)
                        {
                            return null;
                        }
                        return pups;
                    }
                }
            };
        }


        public void UpdatePup(int id, Pup pup)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    UPDATE [dbo].[pup]
                                    SET ownerId = @ownerId,
                                        houseId = @houseId,
                                        name = @name,
                                        breed = @breed,
                                        gender = @gender,
                                        ageYears = @ageYears,
                                        ageMonths = @ageMonths
                                    WHERE Id = @id
                                       ";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@ownerId", pup.OwnerId);
                    cmd.Parameters.AddWithValue("@houseId", pup.HouseId);
                    cmd.Parameters.AddWithValue("@name", pup.Name);
                    cmd.Parameters.AddWithValue("@breed", pup.Breed);
                    cmd.Parameters.AddWithValue("@gender", pup.Gender != null ? pup.Gender : DBNull.Value);
                    cmd.Parameters.AddWithValue("@ageYears", pup.AgeYears != null ? pup.AgeYears : DBNull.Value);
                    cmd.Parameters.AddWithValue("@ageMonths", pup.AgeMonths != null ? pup.AgeMonths : DBNull.Value);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
