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
    public class ActivityController : ControllerBase
    {
        private IActivityRepository _activityRepo;
        public ActivityController(IActivityRepository activityRepo)
        {
            _activityRepo = activityRepo;
        }

        [HttpPost]
        public IActionResult AddNewActivity(Activity activity)
        {
            if (activity == null)
            {
                return NoContent();
            }
            _activityRepo.AddActivity(activity);
            return Ok();
        }

        [HttpGet("house/{id}")]
        public IActionResult ReturnAllActivitiesByHouseId(int id)
        {
            List<Activity> result = _activityRepo.GetActivitiesByHouseId(id);
            if (result == null)
            {
                return NoContent();
            }
            return Ok(result);
        }

        [HttpGet("pup/{id}")]
        public IActionResult ReturnAllActivitiesByPupId(int id)
        {
            List<Activity> result = _activityRepo.GetActivitiesByPupId(id);
            if (result == null)
            {
                return NoContent();
            }
            return Ok(result);
        }

        [HttpGet("user/{id}")]
        public IActionResult ReturnAllActivitiesByUserId(int id)
        {
            List<Activity> result = _activityRepo.GetActivitiesByUserId(id);
            if (result == null)
            {
                return NoContent();
            }
            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult ReturnAllActivitiesById(int id)
        {
            Activity result = _activityRepo.GetActivityById(id);
            if (result == null)
            {
                return NoContent();
            }
            return Ok(result);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateExistingActivity(int id, [FromBody] Activity activity)
        {
            if (activity == null)
            {
                return NoContent();
            }
            _activityRepo.UpdateActivity(activity, id);
            return Ok();
            
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteExistingActivity(int id)
        {
            if (id == null)
            {
                return NoContent();
            }
            _activityRepo.DeleteActivity(id);
            return Ok();
        }
    }
}
