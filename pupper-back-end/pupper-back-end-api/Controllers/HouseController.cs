using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using pupper_back_end_api.Models;
using pupper_back_end_api.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace pupper_back_end_api.Controllers
{
    //[Authorize]
    [Route("/[controller]")]
    [ApiController]
    public class HouseController : ControllerBase
    {
        private IHouseRepository _houseRepo;
        public HouseController(IHouseRepository houseRepo)
        {
            _houseRepo = houseRepo;
        }

        [HttpGet("owner/{id}")]
        public IActionResult ReturnAllHousesByHouseOwnerId(int id)
        {
            List<House> result = _houseRepo.GetAllHousesByHouseOwnerId(id);
            if (result == null)
            {
                return NoContent();
            }
            return Ok(result);
        }

        [HttpGet("member/{id}")]
        public IActionResult ReturnAllHousesByMemberId(int id)
        {
            List<House> result = _houseRepo.GetAllHousesByMemberId(id);
            if (result == null)
            {
                return NoContent();
            }
            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult ReturnHouseById(int id)
        {
            House result = _houseRepo.GetHouseById(id);
            if (result == null)
            {
                return NoContent();
            }
            return Ok(result);
        }

        [HttpPost]
        public IActionResult AddNewHouse([FromBody] House house)
        {
            _houseRepo.AddHouse(house);

            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateExistingHouse(int id, [FromBody] House house)
        {
            _houseRepo.UpdateHouse(id, house);
            if (house == null)
            {
                return NoContent();
            }
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteExistingHouse(int id)
        {
            _houseRepo.DeleteHouse(id);

            return Ok();
        }
    }
}
