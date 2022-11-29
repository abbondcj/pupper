using pupper_back_end_api.Models;

namespace pupper_back_end_api.Repositories
{
    public interface IActivityRepository
    {
        public List<Activity> GetActivitiesByPupId(int id);
        public List<Activity> GetActivitiesByHouseId(int id);
        public List<Activity> GetActivitiesByUserId(int id);
        public Activity GetActivityById(int id);
        public void AddActivity(Activity activity);
        public void UpdateActivity(Activity activity, int id);
        public void DeleteActivity(int id);
    }
}
