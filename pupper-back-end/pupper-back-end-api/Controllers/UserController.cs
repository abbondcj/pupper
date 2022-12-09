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
    public class UserController : ControllerBase
    {
        private IUserRepository _userRepo;

        public UserController(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }


        [HttpGet]
        public IActionResult ReturnAllUsers()
        {
            List<User> result = _userRepo.GetAllUsers();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult ReturnByUserId(int id)
        {
            User result = _userRepo.GetUserById(id);
            if (result == null)
            {
                return NoContent();
            }
            return Ok(result);
        }

        [HttpPost]
        public IActionResult AddNewUser([FromBody] User newUser)
        {
            _userRepo.AddUser(newUser);

            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateExistingUser(int id, [FromBody] User existingUser)
        {
            _userRepo.UpdateUser(id, existingUser);

            if (existingUser == null)
            {
                return NoContent();
            }
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteExistingUser(int id)
        {
            _userRepo.DeleteUser(id);

            return Ok();
        }
    }
}
