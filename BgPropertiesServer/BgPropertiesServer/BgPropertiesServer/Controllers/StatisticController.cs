namespace BgPropertiesServer.Controllers
{
    using System;
    using System.Net.Mime;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Http;
    using BgPropertiesServer.Helpers;
    using BgPropertiesServer.Services;
    using Microsoft.AspNetCore.Authorization;
    using BgPropertiesServer.ViewModels.ApplicationUser;

    [Authorize]
    [ApiController]
    [Route("statistics/[action]")]
    public class StatisticController : Controller
    {
        private readonly IStatisticService statisticService;
        private readonly IAuthService authService;

        public StatisticController(
            IStatisticService statisticService,
            IAuthService authService
            )
        {
            this.statisticService = statisticService;
            this.authService = authService;
        }

        // GET: statistics/top-profitable/[searchSetId:]4e80ee26-4ec6-408f-9e64-b7cd4f3b3404
        [HttpGet("{searchSetId}"), ActionName("top-profitable")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetTopProfitableBgPropertiesAsync([FromHeader] string authorization, string searchSetId)
        {
            try
            {
                var user = await this.authService.IdentifyUserByAuthorizationHeader(authorization);

                var entities = await this.statisticService.GetTopProfitableBgPropertyInSearchSetByPropertyType(user, searchSetId);

                return Ok(entities);
            }
            catch (Exception ex)
            {
                var message = ExceptionMessageCreator.CreateMessage(ex);

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = message });
            }
        }

        // GET: statistics/all-new
        [HttpGet, ActionName("all-newly")]
        public async Task<IActionResult> AllNewBgPropertiesAsync([FromHeader] string authorization)
        {
            try
            {
                var user = await this.authService.IdentifyUserByAuthorizationHeader(authorization);

                var entities = await this.statisticService.GetAllNewBgPropertiesAsync(user);

                return Ok(entities);
            }
            catch (Exception ex)
            {
                var message = ExceptionMessageCreator.CreateMessage(ex);

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = message });
            }
        }

        // GET: statistics/all-new/[searchSetId:]4e80ee26-4ec6-408f-9e64-b7cd4f3b3404
        [HttpGet("{searchSetId}"), ActionName("all-newly")]
        public async Task<IActionResult> AllNewBgPropertiesBySearchSetAsync([FromHeader] string authorization, string searchSetId)
        {
            try
            {
                var user = await this.authService.IdentifyUserByAuthorizationHeader(authorization);

                var entities = await this.statisticService.GetAllNewBgPropertiesAsync(user, searchSetId);

                return Ok(entities);
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
