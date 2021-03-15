namespace BgPropertiesServer.Services
{
    using BgPropertiesServer.Data.Models;
    using BgPropertiesServer.ViewModels.SearchSet;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface ISearchSetService
    {
        Task<string> CreateAsync(SearchSetInputViewModel input, ApplicationUser currentUser);

        Task<ICollection<SearchSetViewModel>> GetAllAsViewModel(ApplicationUser currentUser);

        Task<SearchSetViewModel> GetOneAsViewModel(ApplicationUser currentUser, string searchSetId);

        SearchSet GetOneAsDataModel(string id);

        Task<bool> ToggleCheckingMode(string searchSetId);
    }
}
