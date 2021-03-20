namespace BgPropertiesServer.Controllers
{
    using System.Threading.Tasks;
    using BgPropertiesServer.Data.Models;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    [Authorize]
    public class StatisticController : Controller
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IStatisticService statisticService;

        public StatisticController(UserManager<ApplicationUser> userManager, IStatisticService statisticService)
        {
            this.userManager = userManager;
            this.statisticService = statisticService;
        }

        [HttpGet]
        [HttpPost]
        public async Task<IActionResult> GetTopProfitableBgPropertiesAsync(string searchSetId)
        {
            //try
            //{
            //}
            //catch (Exception)
            //{
            //    var route = this.Request.Path.Value;
            //    return this.View("~/Views/Error/Error.cshtml", route);
            //}

            this.TempData["callingActionViewAllProperties"] = "GetTopProfitableBgProperties";
            var currentUser = await this.userManager.GetUserAsync(this.User);
            var model = await this.statisticService.GetTopProfitableBgPropertyInSearchSetByPropertyType(currentUser, searchSetId);
            //model.PartialModel = new BgPropertiesTitlePartialViewModel()
            //{
            //    Text = $"Top Profitable Bg Properties by",
            //    ForWhat = "searchSet Property Types",
            //    SearchSetName = model.SearchSetName,
            //    BgPropertiesCount = model.BgProperties.Count,
            //};
            //return this.View("~/Views/BgPropertySearching/ViewAllProperties.cshtml", model);
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
            model.PartialModel = new BgPropertiesTitlePartialViewModel()
            {
                Text = $"All NEW Bg Properties by",
                ForWhat = "Date",
                BgPropertiesCount = model.BgProperties.Count,
            };
            return this.View("~/Views/BgPropertySearching/ViewAllProperties.cshtml", model);
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
            model.PartialModel = new BgPropertiesTitlePartialViewModel()
            {
                Text = $"All NEW Bg Properties ",
                ForWhat = "SearchSet",
                SearchSetName = model.SearchSetName,
                BgPropertiesCount = model.BgProperties.Count,
            };
            return this.View("~/Views/BgPropertySearching/ViewAllProperties.cshtml", model);
        }
    }
}
