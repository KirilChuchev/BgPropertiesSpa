namespace BgPropertiesServer.Controllers
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Http;
    using BgPropertiesServer.Helpers;
    using BgPropertiesServer.Services;
    using Microsoft.AspNetCore.Identity;
    using BgPropertiesServer.Data.Models;
    using System.IdentityModel.Tokens.Jwt;
    using BgPropertiesServer.GlobalConstants;
    using BgPropertiesServer.ViewModels.ApplicationUser;

    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IAuthService authService;
        private readonly IBgPropertyService bgPropertyService;
        private readonly ISearchSetService searchSetService;
        private readonly IStatisticService statisticService;

        public UserController(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IAuthService authService,
            IBgPropertyService bgPropertyService,
            ISearchSetService searchSetService,
            IStatisticService statisticService
            )
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.authService = authService;
            this.bgPropertyService = bgPropertyService;
            this.searchSetService = searchSetService;
            this.statisticService = statisticService;
        }

        // POST: user/login
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            try
            {
                var user = await userManager.FindByEmailAsync(model.Email);
                var isPasswordValid = await userManager.CheckPasswordAsync(user, model.Password);

                if (user == null || !isPasswordValid)
                    return StatusCode(
                        StatusCodes.Status401Unauthorized,
                        new Response { Status = "Error", Message = "User login failed! Please check user details and try again." });

                var token = authService.GenerateJwtToken(model);

                return Ok(new
                {
                    username = user.UserName,
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }
            catch (Exception ex)
            {
                var message = ExceptionMessageCreator.CreateMessage(ex);

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = message });
            }
        }

        // POST: user/register
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            try
            {
                var userExists = await userManager.FindByEmailAsync(model.Email);
                if (userExists != null)
                    return StatusCode(
                        StatusCodes.Status500InternalServerError,
                        new Response { Status = "Error", Message = "User with this email already exists!" });

                var result = await authService.ServeRegister(model);

                if (!result.Succeeded)
                {
                    var message = String.Join(Environment.NewLine, result.Errors.Select(x => x.Description).ToArray());
                    return StatusCode(
                        StatusCodes.Status500InternalServerError,
                        new Response { Status = "Error", Message = message }); // "User creation failed! Please check user details and try again."
                }


                return Ok(new Response { Status = "Success", Message = "User created successfully! Please login." });
            }
            catch (Exception ex)
            {
                var message = ExceptionMessageCreator.CreateMessage(ex);

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = message });
            }
        }

        // POST: user/register0admin
        [HttpPost]
        [Route("register-admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterModel model)
        {
            try
            {
                var userExists = await userManager.FindByEmailAsync(model.Email);
                if (userExists != null)
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Admin already exists!" });

                var result = await authService.ServeRegister(model);

                if (!result.Succeeded)
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Admin creation failed! Please check user details and try again." });

                if (!await roleManager.RoleExistsAsync(UserRoles.Admin))
                    await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
                if (!await roleManager.RoleExistsAsync(UserRoles.User))
                    await roleManager.CreateAsync(new IdentityRole(UserRoles.User));

                var user = await userManager.FindByEmailAsync(model.Email);

                if (await roleManager.RoleExistsAsync(UserRoles.Admin))
                {
                    await userManager.AddToRoleAsync(user, UserRoles.Admin);
                }

                return Ok(new Response { Status = "Success", Message = "Admin created successfully!" });
            }
            catch (Exception ex)
            {
                var message = ExceptionMessageCreator.CreateMessage(ex);

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = message });
            }
        }

        // GET: user/data-info
        [HttpGet]
        [Route("data-info")]
        public async Task<IActionResult> GetDataInfo([FromHeader] string authorization)
        {
            try
            {
                var user = await this.authService.IdentifyUserByAuthorizationHeader(authorization);

                var allTrackedBgPropertiesByUserModel = await this.bgPropertyService.GetAllTrackedBgPropertiesByUserAsync(user);
                var allNewlyBgPropertiesByUserModel = await this.statisticService.GetAllNewBgPropertiesAsync(user);
                var allSearchSetsByUserModels = await this.searchSetService.GetAllAsViewModel(user);

                var userData = new
                {
                    allTrackedBgPropertiesByUser = allTrackedBgPropertiesByUserModel.BgProperties.Count,
                    allNewlyBgPropertiesByUser = allNewlyBgPropertiesByUserModel.BgProperties.Count,
                    allSearchSetsByUser = allSearchSetsByUserModels.Count,
                };

                return Ok(userData);
            }
            catch (Exception ex)
            {
                var message = ExceptionMessageCreator.CreateMessage(ex);

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = message });
            }
        }

    }
}
