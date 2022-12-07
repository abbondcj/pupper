using Microsoft.Data.SqlClient;
using pupper_back_end_api.Models;

namespace pupper_back_end_api.Repositories
{
    public class ActivityRepository : IActivityRepository
    {
        private readonly IConfiguration _config;
        public ActivityRepository(IConfiguration config)
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
        public void AddActivity(Activity activity)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    INSERT INTO [dbo].[Activity] (
                                        pupId,
                                        houseId,
                                        userId,
                                        activityTypeId,
                                        dateTime,
                                        description)
                                    OUTPUT INSERTED.ID
                                    VALUES (@pupId, @houseId, @userId, @activityTypeId, @dateTime, @description)
                                    ";
                    cmd.Parameters.AddWithValue("@pupId", activity.PupId);
                    cmd.Parameters.AddWithValue("@houseId", activity.HouseId);
                    cmd.Parameters.AddWithValue("@userId", activity.UserId);
                    cmd.Parameters.AddWithValue("@activityTypeId", activity.ActivityTypeId);
                    cmd.Parameters.AddWithValue("@dateTime", activity.DateTime);
                    cmd.Parameters.AddWithValue("@description", activity.Description != null ? activity.Description : DBNull.Value);

                    int id = (int)cmd.ExecuteScalar();
                    activity.Id = id;
                }
            }
        }

        public List<Activity> GetActivitiesByHouseId(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                                        aTable.id AS activityId, 
                                        aTable.pupId AS pupId,
                                        pTable.ownerId AS pupOwnerId,
                                        pTable.name AS pupName,
                                        aTable.houseId AS houseId,
                                        hTable.houseOwnerId,
                                        hTable.name AS houseName,
                                        aTable.userId AS userId,
                                        uTable.firstName,
                                        uTable.lastName,
                                        aTable.activityTypeId AS activityTypeId, 
                                        aTable.dateTime AS dateTime, 
                                        aTable.description AS description, 
                                        atTable.id AS typeId,
                                        atTable.name AS typeName
                                    FROM [dbo].[Activity] aTable 
                                    JOIN [dbo].[ActivityType] atTable 
                                    ON aTable.activityTypeId=atTable.id
                                    JOIN [dbo].[Pup] pTable
                                    ON aTable.pupId=pTable.id
                                    JOIN [dbo].[User] uTable
                                    ON aTable.userId=uTable.id
                                    JOIN [dbo].[House] hTable
                                    ON hTable.id=aTable.houseId
                                    WHERE aTable.houseId = @HouseId
                                        ";

                    cmd.Parameters.AddWithValue("@HouseId", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Activity> result = new List<Activity>();
                        while (reader.Read())
                        {
                            Activity activity = new Activity()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("activityId")),
                                PupId = reader.GetInt32(reader.GetOrdinal("pupId")),
                                Pup = new Pup()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("pupId")),
                                    OwnerId = reader.GetInt32(reader.GetOrdinal("pupOwnerId")),
                                    HouseId = reader.GetInt32(reader.GetOrdinal("houseId")),
                                    Name = reader.GetString(reader.GetOrdinal("pupName"))
                                },
                                UserId = reader.GetInt32(reader.GetOrdinal("userId")),
                                User = new User()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("userId")),
                                    FirebaseId = "hidden",
                                    Email = "hidden",
                                    FirstName = reader[(reader.GetOrdinal("firstName"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("firstName")),
                                    LastName = reader[(reader.GetOrdinal("lastName"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("lastName"))
                                },
                                HouseId = reader.GetInt32(reader.GetOrdinal("houseId")),
                                House = new House()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("houseId")),
                                    HouseOwnerId = reader.GetInt32(reader.GetOrdinal("houseOwnerId")),
                                    Name = reader.GetString(reader.GetOrdinal("houseName"))
                                },
                                ActivityTypeId = reader.GetInt32(reader.GetOrdinal("activityTypeId")),
                                ActivityType = new ActivityType()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("typeId")),
                                    Name = reader.GetString(reader.GetOrdinal("typeName"))
                                },
                                DateTime = reader.GetDateTime(reader.GetOrdinal("dateTime")),
                                Description = reader[(reader.GetOrdinal("description"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("description"))
                            };
                            result.Add(activity);
                        }

                        return result;
                    }
                }                
            }
        }

        public List<Activity> GetActivitiesByPupId(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                                        aTable.id AS activityId, 
                                        aTable.pupId AS pupId, 
                                        aTable.houseId AS houseId,
                                        aTable.userId AS userId,
                                        aTable.activityTypeId AS activityTypeId, 
                                        aTable.dateTime AS dateTime, 
                                        aTable.description AS description, 
                                        atTable.id AS typeId,
                                        atTable.name AS typeName
                                    FROM [dbo].[Activity] aTable 
                                    JOIN [dbo].[ActivityType] atTable 
                                    ON aTable.activityTypeId=atTable.id
                                    WHERE aTable.pupId = @PupId
                                        ";

                    cmd.Parameters.AddWithValue("@PupId", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Activity> result = new List<Activity>();
                        while (reader.Read())
                        {
                            Activity activity = new Activity()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("activityId")),
                                PupId = reader.GetInt32(reader.GetOrdinal("pupId")),
                                UserId = reader.GetInt32(reader.GetOrdinal("userId")),
                                HouseId = reader.GetInt32(reader.GetOrdinal("houseId")),
                                ActivityTypeId = reader.GetInt32(reader.GetOrdinal("activityTypeId")),
                                ActivityType = new ActivityType()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("typeId")),
                                    Name = reader.GetString(reader.GetOrdinal("typeName"))
                                },
                                DateTime = reader.GetDateTime(reader.GetOrdinal("dateTime")),
                                Description = reader[(reader.GetOrdinal("description"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("description"))
                            };
                            result.Add(activity);
                        }

                        return result;
                    }
                }
            }
        }

        public List<Activity> GetActivitiesByUserId(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                                        aTable.id AS activityId, 
                                        aTable.pupId AS pupId, 
                                        aTable.houseId AS houseId,
                                        aTable.userId AS userId,
                                        aTable.activityTypeId AS activityTypeId, 
                                        aTable.dateTime AS dateTime, 
                                        aTable.description AS description, 
                                        atTable.id AS typeId,
                                        atTable.name AS typeName
                                    FROM [dbo].[Activity] aTable 
                                    JOIN [dbo].[ActivityType] atTable 
                                    ON aTable.activityTypeId=atTable.id
                                    WHERE aTable.userId = @UserId
                                        ";

                    cmd.Parameters.AddWithValue("@UserId", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Activity> result = new List<Activity>();
                        while (reader.Read())
                        {
                            Activity activity = new Activity()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("activityId")),
                                PupId = reader.GetInt32(reader.GetOrdinal("pupId")),
                                UserId = reader.GetInt32(reader.GetOrdinal("userId")),
                                HouseId = reader.GetInt32(reader.GetOrdinal("houseId")),
                                ActivityTypeId = reader.GetInt32(reader.GetOrdinal("activityTypeId")),
                                ActivityType = new ActivityType()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("typeId")),
                                    Name = reader.GetString(reader.GetOrdinal("typeName"))
                                },
                                DateTime = reader.GetDateTime(reader.GetOrdinal("dateTime")),
                                Description = reader[(reader.GetOrdinal("description"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("description"))
                            };
                            result.Add(activity);
                        }

                        return result;
                    }
                }
            }
        }

        public Activity GetActivityById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                                        aTable.id AS activityId, 
                                        aTable.pupId AS pupId, 
                                        aTable.houseId AS houseId,
                                        aTable.userId AS userId,
                                        aTable.activityTypeId AS activityTypeId, 
                                        aTable.dateTime AS dateTime, 
                                        aTable.description AS description, 
                                        atTable.id AS typeId,
                                        atTable.name AS typeName
                                    FROM [dbo].[Activity] aTable 
                                    JOIN [dbo].[ActivityType] atTable 
                                    ON aTable.activityTypeId=atTable.id
                                    WHERE aTable.id = @ActivityId
                                        ";

                    cmd.Parameters.AddWithValue("@ActivityId", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Activity activity = new Activity()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("activityId")),
                                PupId = reader.GetInt32(reader.GetOrdinal("pupId")),
                                UserId = reader.GetInt32(reader.GetOrdinal("userId")),
                                HouseId = reader.GetInt32(reader.GetOrdinal("houseId")),
                                ActivityTypeId = reader.GetInt32(reader.GetOrdinal("activityTypeId")),
                                ActivityType = new ActivityType()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("typeId")),
                                    Name = reader.GetString(reader.GetOrdinal("typeName"))
                                },
                                DateTime = reader.GetDateTime(reader.GetOrdinal("dateTime")),
                                Description = reader[(reader.GetOrdinal("description"))] == DBNull.Value ? null : reader.GetString(reader.GetOrdinal("description"))
                            };
                            return activity;
                        } else
                        {
                            return null;
                        }
                    }
                }
            }
        }

        public void UpdateActivity(Activity activity, int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    UPDATE [dbo].[Activity]
                                    SET pupId = @pupId,
                                        houseId = @houseId,
                                        userId = @userId,
                                        activityTypeId = @activityTypeId,
                                        dateTime = @dateTime,
                                        description = @description
                                    WHERE Id = @id
                                    ";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@pupId", activity.PupId);
                    cmd.Parameters.AddWithValue("@houseId", activity.HouseId);
                    cmd.Parameters.AddWithValue("@userId", activity.UserId);
                    cmd.Parameters.AddWithValue("@activityTypeId", activity.ActivityTypeId != null ? activity.ActivityTypeId : DBNull.Value);
                    cmd.Parameters.AddWithValue("@dateTime", activity.DateTime != null ? activity.DateTime : DBNull.Value);
                    cmd.Parameters.AddWithValue("@description", activity.Description != null ? activity.Description : DBNull.Value);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteActivity(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    DELETE FROM [dbo].[Activity]
                                    WHERE Id = @id
                                    ";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
