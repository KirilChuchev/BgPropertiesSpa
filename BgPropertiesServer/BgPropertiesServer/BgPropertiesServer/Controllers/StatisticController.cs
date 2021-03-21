namespace BgPropertiesServer.Controllers
{
    using System;
    using System.Net.Mime;
    using System.Threading.Tasks;
    using BgPropertiesServer.Data.Models;
    using BgPropertiesServer.Helpers;
    using BgPropertiesServer.Services;
    using BgPropertiesServer.ViewModels.ApplicationUser;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    [Route("statistics/[action]")]
    [ApiController]
    [Authorize]
    public class StatisticController : Controller
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IStatisticService statisticService;
        private readonly IAuthService authService;

        public StatisticController(
            UserManager<ApplicationUser> userManager, 
            IStatisticService statisticService,
            IAuthService authService
            )
        {
            this.userManager = userManager;
            this.statisticService = statisticService;
            this.authService = authService;
        }

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

        public async Task<IActionResult> AllNewBgPropertiesAsync()
        {
            //try
            //{
            //}
            //catch (Exception)
            //{
            //    var route = this.Request.Path.Value;
            //    return this.View("~/Views/Error/Error.cshtml", route);
            //}

            this.TempData["callingActionViewAllProperties"] = "AllNewBgProperties";
            var currentUser = await this.userManager.GetUserAsync(this.User);
            var model = await this.statisticService.GetAllNewBgPropertiesAsync(currentUser);
            //model.PartialModel = new BgPropertiesTitlePartialViewModel()
            //{
            //    Text = $"All NEW Bg Properties by",
            //    ForWhat = "Date",
            //    BgPropertiesCount = model.BgProperties.Count,
            //};
            //return this.View("~/Views/BgPropertySearching/ViewAllProperties.cshtml", model);

            return null;
        }

        [HttpPost]
        public async Task<IActionResult> AllNewBgPropertiesBySearchSetAsync(string searchSetId)
        {
            //try
            //{
            //}
            //catch (Exception)
            //{
            //    var route = this.Request.Path.Value;
            //    return this.View("~/Views/Error/Error.cshtml", route);
            //}

            this.TempData["callingActionViewAllProperties"] = "AllNewBgPropertiesBySearchSet";
            var currentUser = await this.userManager.GetUserAsync(this.User);
            var model = await this.statisticService.GetAllNewBgPropertiesAsync(currentUser, searchSetId);
            //model.PartialModel = new BgPropertiesTitlePartialViewModel()
            //{
            //    Text = $"All NEW Bg Properties ",
            //    ForWhat = "SearchSet",
            //    SearchSetName = model.SearchSetName,
            //    BgPropertiesCount = model.BgProperties.Count,
            //};
            //return this.View("~/Views/BgPropertySearching/ViewAllProperties.cshtml", model);

            return null;
        }
    }
}
