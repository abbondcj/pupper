using pupper_back_end_api.Models;

namespace pupper_back_end_api.Repositories
{
    public interface IHouseMemberRepository
    {
        List<User> GetAllMembersByHouseId(int id);
        List<House> GetAllHousesByUserId(int id);
        public bool ExistingRecordCheck(HouseMember houseMember, int houseMemberId, int houseId);
        public void AddHouseMember(HouseMember houseMember);
        public void UpdateHouseMember(int id, HouseMember houseMember);
        public void DeleteHouseMember(int id);
    }
}
