using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using pupper_back_end_api.Models;
using pupper_back_end_api.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace pupper_back_end_api.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserRepository _userRepo;

        public UserController(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }


        [Authorize]
        [HttpGet]
        public IActionResult ReturnAllUsers()
        {
            List<User> result = _userRepo.GetAllUsers();
            return Ok(result);
        }
    }
}
