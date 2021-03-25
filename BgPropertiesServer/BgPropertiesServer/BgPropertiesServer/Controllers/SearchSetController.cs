namespace BgPropertiesServer.Controllers
{
    using System;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Http;
    using BgPropertiesServer.Services;
    using BgPropertiesServer.Helpers;
    using Microsoft.AspNetCore.Authorization;
    using BgPropertiesServer.ViewModels.SearchSet;
    using BgPropertiesServer.ViewModels.ApplicationUser;

    [Authorize]
    [ApiController]
    [Route("searchsets/[action]")]
    public class SearchSetController : ControllerBase
    {
        private readonly IAuthService authService;
        private readonly ISearchSetService searchSetService;
        private readonly IBgPropertyService bgPropertyService;

        public SearchSetController(
            IAuthService authService,
            ISearchSetService searchSetService,
            IBgPropertyService bgPropertyService)
        {
            this.authService = authService;
            this.searchSetService = searchSetService;
            this.bgPropertyService = bgPropertyService;
        }

        // GET: /searchsets/one/[searchSetId:]4e80ee26-4ec6-408f-9e64-b7cd4f3b3404
        [HttpGet("{searchSetId}"), ActionName("one")]
        public async Task<IActionResult> GetOneById([FromHeader] string authorization, string searchSetId)
        {
            try
            {
                var user = await this.authService.IdentifyUserByAuthorizationHeader(authorization);

                if (user == null)
                {
                    return Unauthorized();
                }

                var entity = await this.searchSetService.GetOneAsViewModel(user, searchSetId);

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

        // GET: /searchsets/all
        [HttpGet, ActionName("all")]
        public async Task<IActionResult> GetAllByUserId([FromHeader] string authorization)
        {
            try
            {
                var user = await this.authService.IdentifyUserByAuthorizationHeader(authorization);

                if (user == null)
                {
                    return Unauthorized();
                }

                var entities = await this.searchSetService.GetAllAsViewModel(user);

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

        // POST: searchsets/create
        [HttpPost, ActionName("create")]
        public async Task<IActionResult> Create([FromHeader] string authorization, [FromBody] SearchSetInputViewModel model)
        {
            try
            {
                var user = await this.authService.IdentifyUserByAuthorizationHeader(authorization);

                if (user == null)
                {
                    return Unauthorized();
                }

                var createdSearchSetId = await this.searchSetService.CreateAsync(model, user);

                await this.bgPropertyService.GetAllBgPropertiesBySearchSetAsync(user.Id, createdSearchSetId);

                return Ok(new { searchSetId = createdSearchSetId });
            }
            catch (Exception ex)
            {
                var message = ExceptionMessageCreator.CreateMessage(ex);

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = message });
            }
        }

        // PUT: searchsets/edit
        [HttpPut("{searchSetId}"), ActionName("edit")]
        public async Task<IActionResult> Edit([FromHeader] string authorization, string searchSetId, [FromBody] SearchSetInputViewModel model)
        {
            try
            {
                var user = await this.authService.IdentifyUserByAuthorizationHeader(authorization);

                var updatedSearchSetId = await this.searchSetService.EditAsync(searchSetId, model);

                await this.bgPropertyService.GetAllBgPropertiesBySearchSetAsync(user.Id, updatedSearchSetId);

                return Ok(new { searchSetId = updatedSearchSetId });
            }
            catch (Exception ex)
            {
                var message = ExceptionMessageCreator.CreateMessage(ex);

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = message });
            }
        }

        //// DELETE api/<SearchSetController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
