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

    [Route("tracking/[action]")]
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

        [HttpPost, ActionName("track")]
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
    }
}
