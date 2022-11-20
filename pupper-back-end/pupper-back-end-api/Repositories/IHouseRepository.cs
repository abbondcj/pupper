using pupper_back_end_api.Models;

namespace pupper_back_end_api.Repositories
{
    public interface IHouseRepository
    {
        List<House> GetAllHousesByHouseOwnerId(int id);
        List<House> GetAllHousesByMemberId(int id);
        House GetHouseById(int id);
        public void AddHouse(House house);
        public void DeleteHouse(int id);
        public void UpdateHouse(int id, House house);
    }
}
