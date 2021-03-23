namespace BgPropertiesServer.Services
{
    using System.Threading.Tasks;
    using System.Collections.Generic;
    using BgPropertiesServer.Data.Models;
    using BgPropertiesServer.ViewModels.SearchSet;

    public interface ISearchSetService
    {
        Task<string> CreateAsync(SearchSetInputViewModel input, ApplicationUser currentUser);

        Task<ICollection<SearchSetViewModel>> GetAllAsViewModel(ApplicationUser currentUser);

        Task<SearchSetViewModel> GetOneAsViewModel(ApplicationUser currentUser, string searchSetId);

        SearchSet GetOneAsDataModel(string id);
    }
}
