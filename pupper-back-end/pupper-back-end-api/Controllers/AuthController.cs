using Microsoft.AspNetCore.Mvc;
using pupper_back_end_api.Models;
using pupper_back_end_api.Repositories;
using FirebaseAdmin.Auth;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace pupper_back_end_api.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepo;

        public AuthController(IUserRepository userRepository)
        {
            _userRepo = userRepository;
        }
        
        [HttpGet("{firebaseId}")]
        public async Task<IActionResult> ValidateUserExists(string firebaseId)
        {
            var firebaseAuthUser = await FirebaseAuth.DefaultInstance.GetUserAsync(firebaseId);
            User user = _userRepo.GetUserByFirebaseId(firebaseId);
            if (user == null)
            {
                User newUser = new()
                {
                    FirebaseId = firebaseId,
                    Email = firebaseAuthUser.Email,
                };
                _userRepo.AddUser(newUser);
                return Ok(newUser);
            }

            return Ok(user);
        }
    }
}
