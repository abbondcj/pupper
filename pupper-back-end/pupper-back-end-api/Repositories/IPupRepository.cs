using pupper_back_end_api.Models;

namespace pupper_back_end_api.Repositories
{
    public interface IPupRepository
    {
        List<Pup> GetAllPups();
        Pup GetPupById(int id);
        List<Pup> GetPupsByOwnerId(int id);
        List<Pup> GetPupsByHouseId(int id);
        public void AddPup(Pup pup);
        public void DeletePup(int id);
        public void UpdatePup(int id, Pup pup);
    }
}
