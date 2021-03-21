using BgPropertiesServer.Data.Models;
using BgPropertiesServer.ViewModels.BgProperty;
using System.Threading.Tasks;

namespace BgPropertiesServer.Services
{
    public interface IBgPropertyService
    {
        Task<OneBgPropertyViewModel> GetBgPropertyByIdAsync(string bgPropertyId, string searchSetId, string currentUserId = null);

        Task<AllBgPropertiesViewModel> GetAllBgPropertiesBySearchSetAsync(string currentUserId, string searchSetId);

        Task TrackBgPropertyAsync(ApplicationUser currentUser, string bgPropertyId);

        Task<AllBgPropertiesViewModel> GetAllTrackedBgPropertiesBySearchSetAsync(ApplicationUser currentUser, string searchSetId);

        Task<AllBgPropertiesViewModel> GetAllTrackedBgPropertiesByUserAsync(ApplicationUser currentUser);
    }
}
