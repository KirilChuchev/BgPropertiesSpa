namespace BgPropertiesServer.Services
{
    using System.Linq;
    using System.Threading.Tasks;
    using BgPropertiesServer.Data;
    using System.Collections.Generic;
    using BgPropertiesServer.Helpers;
    using BgPropertiesServer.Data.Models;
    using Microsoft.EntityFrameworkCore;
    using BgPropertiesServer.ViewModels.SearchSet;
    using BgPropertiesServer.ViewModels.SearchCriteria;

    public class SearchSetService : ISearchSetService
    {
        private readonly ApplicationDbContext db;

        public SearchSetService(ApplicationDbContext db)
        {
            this.db = db;

            // DI за Repository-то
        }

        public async Task<string> CreateAsync(SearchSetInputViewModel input, ApplicationUser currentUser)
        {
            //// ползваме репозиторито

            var searchSet = new SearchSet()
            {
                Name = input.SearchSetName,
                Description = input.Description,
            };

            var fullfilledSearchCriterias = HelpMethods.GetFullfilledSearchCriterias(input);

            //// TODO: ако няма да имам опция за EDIT на SearchSet-a тогава трябва да проверя дали вече няма такъв SearchCriteria

            foreach (var searchCriteriaViewModel in fullfilledSearchCriterias)
            {
                var searchCriteria = new SearchCriteria()
                {
                    Name = searchCriteriaViewModel.Name,
                    Value = searchCriteriaViewModel.Value,
                };

                await this.db.SearchCriterias.AddAsync(searchCriteria);
                await this.db.SearchCriteriasSearchSets.AddAsync(new SearchCriteriaSearchSet()
                {
                    SearchCriteria = searchCriteria,
                    SearchSet = searchSet,
                });
            }

            currentUser.SearchSets.Add(searchSet);

            await this.db.SaveChangesAsync();

            return searchSet.Id;
        }

        public async Task<string> EditAsync(string searchSetId, SearchSetInputViewModel input)
        {
            var fullfilledSearchCriterias = HelpMethods.GetFullfilledSearchCriterias(input).ToList();

            var searchSet = await this.db.SearchSets.FirstOrDefaultAsync(x => x.Id == searchSetId);

            var searchCriterias =
                await this.db.SearchCriteriasSearchSets
                    .Where(x => x.SearchSetId == searchSetId)
                    .Select(x => x.SearchCriteria).ToArrayAsync();

            if (searchSet.Name != input.SearchSetName)
            {
                searchSet.Name = input.SearchSetName;
            }

            if (searchSet.Description != input.Description)
            {
                searchSet.Description = input.Description;
            }

            //// Check and update or remove all old unneccessary searchCriterias with their relations to this SearchSet.
            foreach (var searchCriteria in searchCriterias)
            {
                var fullyEqualfullfilledSearchCriteria =
                        fullfilledSearchCriterias.FirstOrDefault(x => x.Name == searchCriteria.Name && x.Value == searchCriteria.Value);

                if (fullyEqualfullfilledSearchCriteria != null)
                {
                    fullfilledSearchCriterias.Remove(fullyEqualfullfilledSearchCriteria);
                    continue;
                }

                var namelyEqualfullfilledSearchCriteria =
                    fullfilledSearchCriterias.FirstOrDefault(x => x.Name == searchCriteria.Name);

                if (namelyEqualfullfilledSearchCriteria != null)
                {
                    searchCriteria.Value = namelyEqualfullfilledSearchCriteria.Value;
                    fullfilledSearchCriterias.Remove(namelyEqualfullfilledSearchCriteria);
                    continue;
                }

                //// Remove old unneccessary searchCriteria and the relation with current SearchSet.
                var searchCriteriasSearchSetToDelete =
                    await this.db.SearchCriteriasSearchSets.FirstOrDefaultAsync(x => x.SearchCriteriaId == searchCriteria.Id);
                this.db.SearchCriteriasSearchSets.Remove(searchCriteriasSearchSetToDelete);
                //var searchCriteriaToDelete = await this.db.SearchCriterias.FirstOrDefaultAsync(x => x.Id == searchCriteria.SearchCriteriaId);
                this.db.SearchCriterias.Remove(searchCriteria);
            }

            await this.db.SaveChangesAsync();

            //// Add the entirely new searchCriterias and build relations with this SearchSet.
            foreach (var fullfilledSearchCriteria in fullfilledSearchCriterias)
            {
                var newSearchCriteria = new SearchCriteria()
                {
                    Name = fullfilledSearchCriteria.Name,
                    Value = fullfilledSearchCriteria.Value,
                };

                await this.db.SearchCriterias.AddAsync(newSearchCriteria);
                await this.db.SearchCriteriasSearchSets.AddAsync(new SearchCriteriaSearchSet()
                {
                    SearchCriteria = newSearchCriteria,
                    SearchSet = searchSet,
                });
            }

            await this.db.SaveChangesAsync();

            return searchSet.Id;
        }

        public async Task<ICollection<SearchSetViewModel>> GetAllAsViewModel(ApplicationUser currentUser)
        {
            var searchSetViewModels = this.db.SearchSets.Where(x => x.ApplicationUser.Id == currentUser.Id)
                .AsNoTracking()
                .OrderByDescending(x => x.CreatedOn)
                .Select(x => new SearchSetViewModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    CreatedOn = x.CreatedOn,
                    IsInCheckingMode = x.IsInCheckingMode,
                    Description = x.Description,
                    BgPropertiesCount = this.db.BgProperties.Where(y => y.SearchSets.Any(z => z.SearchSetId == x.Id)).Count(),
                    SearchCriterias = x.CriteriasCollection.Select(y => new SearchCriteriaViewModel()
                    {
                        Name = y.SearchCriteria.Name,
                        Value = y.SearchCriteria.Value,
                    }).ToList(),
                }).ToListAsync();

            return await searchSetViewModels;
        }

        public async Task<SearchSetViewModel> GetOneAsViewModel(ApplicationUser currentUser, string searchSetId)
        {
            var searchSetViewModel = this.db.SearchSets.Where(x => x.Id == searchSetId && x.ApplicationUserId == currentUser.Id)
                .Select(x => new SearchSetViewModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    IsInCheckingMode = x.IsInCheckingMode,
                    Description = x.Description,
                    BgPropertiesCount = this.db.BgProperties.Where(y => y.SearchSets.Any(z => z.SearchSetId == searchSetId)).Count(),
                    SearchCriterias = x.CriteriasCollection.Select(y => new SearchCriteriaViewModel()
                    {
                        Name = y.SearchCriteria.Name,
                        Value = y.SearchCriteria.Value,
                    }).ToList(),
                }).FirstOrDefaultAsync();

            return await searchSetViewModel;
        }

        public SearchSet GetOneAsDataModel(string id)
        {
            return this.db.SearchSets
                            .Where(x => x.Id == id)
                            .Select(x => new SearchSet
                            {
                                Name = x.Name,
                                ApplicationUserId = x.ApplicationUserId,
                                IsInCheckingMode = x.IsInCheckingMode,
                                Description = x.Description,
                                CriteriasCollection = x.CriteriasCollection.Select(y => new SearchCriteriaSearchSet()
                                {
                                    SearchSet = y.SearchSet,
                                    SearchCriteria = y.SearchCriteria,
                                }).ToList(),
                            })
                            .FirstOrDefault();
        }
    }
}
