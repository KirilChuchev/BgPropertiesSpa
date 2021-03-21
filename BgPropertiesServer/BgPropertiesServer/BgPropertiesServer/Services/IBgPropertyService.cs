using BgPropertiesServer.Data.Models;
using BgPropertiesServer.ViewModels.BgProperty;
using System.Threading.Tasks;

namespace BgPropertiesServer.Services
{
    public interface IBgPropertyService
    {
        Task<OneBgPropertyViewModel> GetBgPropertyByIdAsync(string bgPropertyId, string searchSetId, string currentUserId = null);

        Task<BgProperty> GetBgPropertyOnlyByIdAsync(string bgPropertyId);

        Task<AllBgPropertiesViewModel> GetAllBgPropertiesBySearchSetAsync(string currentUserId, string searchSetId);
    }
}
