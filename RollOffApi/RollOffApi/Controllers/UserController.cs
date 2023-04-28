using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

using RollOffApi.Repository;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;


namespace RollOffApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ExcelDataContext _authContext;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;
        
        public UserController(ExcelDataContext ourExcelData, IConfiguration configuration, IEmailService emailService)
        {
            _authContext = ourExcelData;
            _configuration = configuration;
            _emailService = emailService;
        }

        [Authorize]
        [HttpGet("GetUsers")] 
        public async Task<IEnumerable<User>> GetUsers() {
            return await _authContext.Users.ToListAsync(); 
        }


        [HttpPost("authenticate")]
        public async Task<IActionResult> Authentication([FromBody] User usertable)
        {
            if (usertable == null)
                return BadRequest();
            var user = await _authContext.Users.FirstOrDefaultAsync(x => x.UserName == usertable.UserName && x.Password == usertable.Password);
            if (user == null)
                return NotFound(new { Message = "User Not Found" });

            user.Token = CreateJwtToken(user);
            return Ok(new
            { 
                Token = user.Token,
                Message = "Login Success!"
            });

        }

        [HttpPost("Register")]
        public async Task<IActionResult> RegisterUser([FromBody] User usertable)
        {
            if (usertable == null)
                return BadRequest();
            await _authContext.Users.AddAsync(usertable);
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                Message = "User Registered!"
            });
        }

        private string CreateJwtToken(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("verysecretefsagddsdfafdafsa");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role, $"{user.Role}"),
                 new Claim(ClaimTypes.Name, $"{user.FirstName}{user.LastName}")


            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescripter = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddSeconds(10),
                SigningCredentials = credentials
            };

            var token = jwtTokenHandler.CreateToken(tokenDescripter);
            return jwtTokenHandler.WriteToken(token);
        }

        /*

        [HttpPost("send-reset-email/{email}")]
        public async Task<IActionResult> SendEmail(string email)
        {
            var user = await _authContext.Users.FirstOrDefaultAsync(a => a.Email == email);
            if (user is null)
            {
                return NotFound("user not present");
            }
            var token =new SymmetricSecurityKey(Encoding.UTF8.GetBytes("64"));
            var emailToken = Convert.ToBase64String();
            try
            {
                 _emailService.SendEmail(email);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest("something went wrong while sending email" + e);
            }
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDTO resetPasswordDto)
        {
            var newToken = resetPasswordDto.EmailToken.Replace(" " , "+");
            var user = await _authContext.Users.AsNoTracking().FirstOrDefaultAsync(a => a.Email == resetPasswordDto.Email);
            if(user is null)
            {
                return NotFound("user not present");
            }
            var tokenCode = user.ResetPasswordToken;
            DateTime emailTokenExpiry = (DateTime)user.ResetPasswordExpiry;
            if (tokenCode != resetPasswordDto.EmailToken || emailTokenExpiry< DateTime.Now)
            {
                return BadRequest("something went wrong" );
            }
           
            user.Password = resetPasswordDto.NewPassword;
            _authContext.Entry(user).State = EntityState.Modified;
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                StatusCode = 200,
                Message = "Password reset successfully"
            }); ;
            ;
        }*/

    }
}

