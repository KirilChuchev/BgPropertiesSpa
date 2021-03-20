namespace BgPropertiesServer.Services
{
    using BgPropertiesServer.Data.Models;
    using BgPropertiesServer.ViewModels.BgProperty;
    using System.Threading.Tasks;

	public interface IStatisticService
    {
        Task<AllBgPropertiesViewModel> GetTopProfitableBgPropertyInSearchSetByPropertyType(ApplicationUser currentUser, string searchSetId);

        Task<AllBgPropertiesViewModel> GetAllNewBgPropertiesAsync(ApplicationUser currentUser, string searchSetId = null);
    }
}
