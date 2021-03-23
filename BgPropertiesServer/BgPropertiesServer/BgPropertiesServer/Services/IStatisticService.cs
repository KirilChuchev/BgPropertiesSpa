namespace BgPropertiesServer.Services
{
    using System.Threading.Tasks;
    using BgPropertiesServer.Data.Models;
    using BgPropertiesServer.ViewModels.BgProperty;

	public interface IStatisticService
    {
        Task<AllBgPropertiesViewModel> GetTopProfitableBgPropertyInSearchSetByPropertyType(ApplicationUser currentUser, string searchSetId);

        Task<AllBgPropertiesViewModel> GetAllNewBgPropertiesAsync(ApplicationUser currentUser, string searchSetId = null);
    }
}
