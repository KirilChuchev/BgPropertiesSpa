namespace BgPropertiesServer.Controllers
{
    using BgPropertiesServer.Helpers;
    using BgPropertiesServer.Services;
    using BgPropertiesServer.ViewModels.ApplicationUser;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using System;
    using System.Threading.Tasks;

    [Route("tracking")] // /[action]
    [ApiController]
    [Authorize]
    public class BgPropertyTrackingController : ControllerBase
    {
        private readonly IAuthService authService;
        private readonly IBgPropertyService bgPropertyService;

        public BgPropertyTrackingController(
            IAuthService authService,
            IBgPropertyService bgPropertyService)
        {
            this.authService = authService;
            this.bgPropertyService = bgPropertyService;
        }

        // POST: tracking/track
        [HttpPost]
        [Route("track/")]
        public async Task<IActionResult> TrackAsync([FromHeader] string authorization, [FromBody] string bgPropertyId)
        {
            try
            {
                var user = await this.authService.IdentifyUserByAuthorizationHeader(authorization);

                if (user == null)
                {
                    return Unauthorized();
                }

                await this.bgPropertyService.TrackBgPropertyAsync(user, bgPropertyId);

                return Ok();
            }
            catch (Exception ex)
            {
                var message = ExceptionMessageCreator.CreateMessage(ex);

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = message });
            }
        }

        // GET: tracking/searchsets/[searchSetId:]4e80ee26-4ec6-408f-9e64-b7cd4f3b3404
        [HttpGet]
        [Route("searchsets/{searchSetId}")]
        public async Task<IActionResult> GetAllTrackedBySearchSet([FromHeader] string authorization, string searchSetId)
        {

            try
            {
                var user = await this.authService.IdentifyUserByAuthorizationHeader(authorization);

                if (user == null)
                {
                    return Unauthorized();
                }

                var entities = await this.bgPropertyService.GetAllTrackedBgPropertiesBySearchSetAsync(user, searchSetId);

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

        // GET: tracking/user/
        [HttpGet]
        [Route("user/")]
        public async Task<IActionResult> GetAllTrackedByUser([FromHeader] string authorization)
        {
            try
            {
                var user = await this.authService.IdentifyUserByAuthorizationHeader(authorization);

                if (user == null)
                {
                    return Unauthorized();
                }

                var entities = await this.bgPropertyService.GetAllTrackedBgPropertiesByUserAsync(user);

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
