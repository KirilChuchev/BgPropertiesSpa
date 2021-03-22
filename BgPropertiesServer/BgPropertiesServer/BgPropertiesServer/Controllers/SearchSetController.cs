namespace BgPropertiesServer.Controllers
{
    using BgPropertiesServer.Data;
    using BgPropertiesServer.Helpers;
    using BgPropertiesServer.Services;
    using BgPropertiesServer.ViewModels.ApplicationUser;
    using BgPropertiesServer.ViewModels.SearchSet;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Net.Http.Headers;
    using System.Threading.Tasks;

    [Route("searchsets/[action]")]
    [ApiController]
    [Authorize]
    public class SearchSetController : ControllerBase
    {
        private readonly ApplicationDbContext db;
        private readonly IAuthService authService;
        private readonly ISearchSetService searchSetService;

        public SearchSetController(
            ApplicationDbContext db,
            IAuthService authService,
            ISearchSetService searchSetService)
        {
            this.db = db;
            this.authService = authService;
            this.searchSetService = searchSetService;
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

        //// PUT api/<SearchSetController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<SearchSetController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
