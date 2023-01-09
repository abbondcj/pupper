using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using pupper_back_end_api.Models;
using pupper_back_end_api.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace pupper_back_end_api.Controllers
{
    [Authorize]
    [Route("/[controller]")]
    [ApiController]
    public class PupController : ControllerBase
    {
        private IPupRepository _pupRepo;

        public PupController(IPupRepository pupRepo)
        {
            _pupRepo = pupRepo;
        }

        [HttpGet]
        public IActionResult ReturnAllPups()
        {
            List<Pup> result = _pupRepo.GetAllPups();
            if (result == null)
            {
                return NoContent();
            }
            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult ReturnPupById(int id)
        {
            Pup result = _pupRepo.GetPupById(id);
            if (result == null)
            {
                return NoContent();
            }
            return Ok(result);
        }

        [HttpGet("owner/{id}")]
        public IActionResult ReturnAllPupsByOwnerId(int id)
        {
            List<Pup> result = _pupRepo.GetPupsByOwnerId(id);
            if (result == null)
            {
                return NoContent();
            }
            return Ok(result);
        }

        [HttpGet("house/{id}")]
        public IActionResult ReturnAllPupsByHouseId(int id)
        {
            List<Pup> result = _pupRepo.GetPupsByHouseId(id);
            if (result == null)
            {
                return NoContent();
            }
            return Ok(result);
        }

        [HttpPost]
        public IActionResult AddNewPup([FromBody] Pup pup)
        {
            _pupRepo.AddPup(pup);

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteExistingPup(int id)
        {
            _pupRepo.DeletePup(id);

            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateExistingPup(int id, [FromBody] Pup pup)
        {
            _pupRepo.UpdatePup(id, pup);

            if (pup == null)
            {
                return NoContent();
            }
            return Ok();
        }
    }
}
