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
    [Route("bg-properties/[action]")]
    public class BgPropertyController : ControllerBase
    {
        private readonly IAuthService authService;
        private readonly IBgPropertyService bgPropertyService;

        public BgPropertyController(
            IAuthService authService,
            IBgPropertyService bgPropertiesService)
        {
            this.authService = authService;
            this.bgPropertyService = bgPropertiesService;
        }

        // GET: /bg-properties/one/[bgPropertyId:]002f51fc-20cb-4fc2-a1d1-d4097d5b9337/[searchSetId:]4e80ee26-4ec6-408f-9e64-b7cd4f3b3404
        [HttpGet, ActionName("one")]
        [Route("{bgPropertyId}/{searchSetId}")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetOne([FromHeader] string authorization, string bgPropertyId, string searchSetId)
        {
            try
            {
                var user = await this.authService.IdentifyUserByAuthorizationHeader(authorization);

                if (user == null)
                {
                    return Unauthorized();
                }

                var entity = await this.bgPropertyService.GetBgPropertyByIdAsync(bgPropertyId, searchSetId, user.Id);

                if (entity == null)
                {
                    return NotFound();
                }

                return Ok(entity);
            }
            catch (Exception ex)
            {
                var message = ExceptionMessageCreator.CreateMessage(ex);

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = message });
            }
        }

        // GET: /bg-properties/all/[searchSetId:]4e80ee26-4ec6-408f-9e64-b7cd4f3b3404
        [HttpGet("{searchSetId}"), ActionName("all")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetAllBySearchSet([FromHeader] string authorization, string searchSetId)
        {
            try
            {
                var user = await this.authService.IdentifyUserByAuthorizationHeader(authorization);

                var entities = await this.bgPropertyService.GetAllBgPropertiesBySearchSetAsync(user.Id, searchSetId);

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

        //// POST api/<BgProperty>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/<BgProperty>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<BgProperty>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
