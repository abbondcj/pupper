using Microsoft.AspNetCore.Mvc;
using pupper_back_end_api.Models;
using pupper_back_end_api.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace pupper_back_end_api.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class HouseMemberController : ControllerBase
    {
        private IHouseMemberRepository _houseMemberRepo;
        public HouseMemberController(IHouseMemberRepository houseMemberRepo)
        {
            _houseMemberRepo = houseMemberRepo;
        }

        [HttpGet("userId/{id}")]
        public IActionResult ReturnHousesByUserId(int id)
        {
            List<House> result = _houseMemberRepo.GetAllHousesByUserId(id);
            if (result.Count == 0)
            {
                return NoContent();
            }

            return Ok(result);
        }

        [HttpGet("houseId/{id}")]
        public IActionResult ReturnMembersByHouseId(int id)
        {
            List<User> result = _houseMemberRepo.GetAllMembersByHouseId(id);
            if (result.Count == 0)
            {
                return NoContent();
            }

            return Ok(result);
        }
    }
}
