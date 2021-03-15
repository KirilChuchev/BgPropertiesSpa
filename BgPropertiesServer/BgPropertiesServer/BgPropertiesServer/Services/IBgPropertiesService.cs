using BgPropertiesServer.Data.Models;
using BgPropertiesServer.ViewModels.BgProperty;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BgPropertiesServer.Services
{
    public interface IBgPropertiesService
    {
        Task<OneBgPropertyViewModel> GetBgPropertyByIdAsync(string bgPropertyId, string searchSetId, string currentUserId = null);

        Task<BgProperty> GetBgPropertyOnlyByIdAsync(string bgPropertyId);

        Task<AllBgPropertiesViewModel> GetAllBgPropertiesBySearchSetAsync(string currentUserId, string searchSetId);
    }
}
