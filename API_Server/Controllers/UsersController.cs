using API_Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SQLitePCL;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API_Server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        public UsersController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WishList>>> GetUser()
        {
            if(User.Identity.IsAuthenticated)
            {
                var userId = User.FindFirst("UserId")?.Value;
                return Ok(userId);  
            }
            return Unauthorized();  
        }


        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([Bind("Username,Password")] LoginModel account)
        {
            var user = await _userManager.FindByNameAsync(account.Username);
            if (user != null && await _userManager.CheckPasswordAsync(user, account.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }
            return Unauthorized();
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([Bind("Username", "Password", "Email", "FullName", "Gender", "BirthDay", "Address", "PhoneNumber")] RegisterModel account)
        {
            var userExists = await _userManager.FindByNameAsync(account.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError);

            User user = new User()
            {
                Email = account.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = account.Username,
                FullName = account.FullName,
                Gender = account.Gender,
                BirthDay = account.BirthDay,
                Address = account.Address,
                PhoneNumber = account.PhoneNumber
            };
            var result = await _userManager.CreateAsync(user, account.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError);
            if (await _roleManager.RoleExistsAsync("User"))
                await _userManager.AddToRoleAsync(user, "User");
            return Ok();
        }


        [HttpPost]
        [Route("register-admin")]
        public async Task<IActionResult> RegisterAdmin([Bind("Username", "Password", "Email", "FullName", "Gender", "BirthDay", "Address", "PhoneNumber")] RegisterModel admin)
        {
            var userExists = await _userManager.FindByNameAsync(admin.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError);

            User user = new User()
            {
                Email = admin.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = admin.Username,
                FullName = admin.FullName,
                Gender = admin.Gender,
                BirthDay = admin.BirthDay,
                Address = admin.Address,
                PhoneNumber = admin.PhoneNumber,

            };
            var result = await _userManager.CreateAsync(user, admin.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError);

            if (!await _roleManager.RoleExistsAsync("Admin"))
                await _roleManager.CreateAsync(new IdentityRole("Admin"));
            if (!await _roleManager.RoleExistsAsync("User"))
                await _roleManager.CreateAsync(new IdentityRole("User"));

            if (await _roleManager.RoleExistsAsync("Admin"))
            {
                await _userManager.AddToRoleAsync(user, "Admin");
            }

            return Ok();
        }
    }
}
