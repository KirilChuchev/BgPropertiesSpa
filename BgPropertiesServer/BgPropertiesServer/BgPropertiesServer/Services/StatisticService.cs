namespace BgProperties.Services.Data
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using BgPropertiesServer.Data;
    using BgPropertiesServer.Data.Models;
    using BgPropertiesServer.ViewModels.BgProperty;
    using BgPropertiesServer.ViewModels.SearchCriteria;
    using BgPropertiesServer.ViewModels.SearchSet;
    using Microsoft.EntityFrameworkCore;

    public class StatisticService : IStatisticService
    {
        private readonly ApplicationDbContext db;

        public StatisticService(ApplicationDbContext db)
        {
            this.db = db;
        }

        public async Task<AllBgPropertiesViewModel> GetTopProfitableBgPropertyInSearchSetByPropertyType(ApplicationUser currentUser, string searchSetId)
        {
            // var queryParamsCollection = HelpMethods.GetFullfilledSearchCriterias(model) as HashSet<SearchCriteriaViewModel>;

            // var bgProperties = await this.CreateBgPropertiesQueryFromDb(this.db, queryParamsCollection);

            var searchSetViewModel = this.db.SearchSets
                    .Where(x => x.Id == searchSetId)
                    .Select(x => new SearchSetViewModel()
                    {
                        Id = x.Id,
                        Name = x.Name,
                        SearchCriterias = x.CriteriasCollection.Select(x => new SearchCriteriaViewModel()
                        {
                            Name = x.SearchCriteria.Name,
                            Value = x.SearchCriteria.Value,
                        }).ToList(),
                    }).FirstOrDefault();

            var propertyTypes = searchSetViewModel.SearchCriterias.Where(x => x.Name.EndsWith("PropType")).Select(x => x.Value).ToArray();

            var topProfitableBgPropertiesByType = new HashSet<BgPropertyViewModel>();

            foreach (var propType in propertyTypes)
            {
                var bgProperty =
                        await this.db.BgProperties
                        .Where(x => x.PropertyType.Name == propType
                               && x.SearchSets.Any(y => y.SearchSetId == searchSetId)
                               && x.PricePerSquareMeterInEUR != null)
                        .OrderBy(x => x.PricePerSquareMeterInEUR)
                        .Select(x => new BgPropertyViewModel()
                        {
                            Id = x.Id,
                            Url = x.Url,
                            Area = x.Area.ToString(),
                            Floor = x.Floor.ToString(),
                            PropertyType = x.PropertyType.ToString(),
                            Location = x.Location.ToString(),
                            TotalBuildingFloors = x.TotalBuildingFloors.ToString(),
                            Description = x.Desctiption.ToString(),
                            Price = x.Price,
                            PriceInEUR = x.PriceInEUR,
                            PricePerSquareMeter = x.PricePerSquareMeter,
                            PricePerSquareMeterInEUR = x.PricePerSquareMeterInEUR,
                            IsTracked = x.TrackingUsers.Any(x => x.ApplicationUserId == currentUser.Id),
                            SearchSetId = searchSetId,
                            IsNewly = this.db.NewlySearchSetsBgProperties.Any(y => y.SearchSetId == searchSetId && y.BgPropertyId == x.Id),
                            Currency = x.Currency,
                        })
                        .FirstOrDefaultAsync();

                if (bgProperty != null)
                {
                    topProfitableBgPropertiesByType.Add(bgProperty);
                }
            }

            return new AllBgPropertiesViewModel()
            {
                SearchSetId = searchSetId,
                SearchSetName = searchSetViewModel?.Name ?? string.Empty,
                // BgProperties = userAllBgPropertiesTrackedFromCurrentSearchSet,
                BgProperties = topProfitableBgPropertiesByType,
            };
        }

        public async Task<AllBgPropertiesViewModel> GetAllNewBgPropertiesAsync(ApplicationUser currentUser, string searchSetId = null)
        {
            var allNewBgProperties = new List<BgPropertyViewModel>();

            if (searchSetId != null)
            {
                // var searchSet = this.db.SearchSets.FirstOrDefault(x => x.Id == searchSetId);
                //allNewBgProperties =
                //        await this.db.NewlyListedUsersBgProperties
                //        .Where(x => x.ApplicationUserId == currentUser.Id && x.BgProperty.SearchSets.Any(y => y.SearchSetId == searchSetId) && x.BgProperty.IsNewlyFetched == true)
                //        .Select(x => x.BgProperty)
                //        .Select(x => new BgPropertyViewModel()
                //        {
                //            Id = x.Id,
                //            CreatedOn = x.CreatedOn.ToString(), // "n"
                //            Url = x.Url,
                //            Area = x.Area.ToString(),
                //            Floor = x.Floor.ToString(),
                //            PropertyType = x.PropertyType.ToString(),
                //            Location = x.Location.ToString(),
                //            TotalBuildingFloors = x.TotalBuildingFloors.ToString(),
                //            Description = x.Desctiption.ToString(),
                //            Price = x.Price,
                //            PriceInEUR = x.PriceInEUR,
                //            PricePerSquareMeter = x.PricePerSquareMeter,
                //            PricePerSquareMeterInEUR = x.PricePerSquareMeterInEUR,
                //            IsTracked = x.TrackingUsers.Any(x => x.ApplicationUserId == currentUser.Id),
                //            IsNewlyFetched = x.IsNewlyFetched,
                //            Currency = x.Currency,
                //            SearchSetId = searchSetId,
                //            //SearchSets = x.SearchSets.Select(y => new SearchSetViewModel()
                //            //{
                //            //    Id = y.SearchSet.Id,
                //            //    Name = y.SearchSet.Name,
                //            //    Description = y.SearchSet.Description,
                //            //}).ToArray(),
                //        })
                //        .OrderByDescending(x => x.IsTracked)
                //        .ThenByDescending(x => x.CreatedOn)
                //        .ToListAsync();

                allNewBgProperties = await this.db.BgProperties
                        .Where(x =>
                                x.SearchSets.Any(y => y.SearchSetId == searchSetId && y.SearchSet.ApplicationUserId == currentUser.Id)
                                && this.db.NewlySearchSetsBgProperties.Any(y => y.BgPropertyId == x.Id && y.SearchSetId == searchSetId))
                        .Select(x => new BgPropertyViewModel()
                        {
                            Id = x.Id,
                            CreatedOn = x.CreatedOn, // "n"
                            Url = x.Url,
                            Area = x.Area.ToString(),
                            Floor = x.Floor.ToString(),
                            PropertyType = x.PropertyType.ToString(),
                            Location = x.Location.ToString(),
                            TotalBuildingFloors = x.TotalBuildingFloors.ToString(),
                            Description = x.Desctiption.ToString(),
                            Price = x.Price,
                            PriceInEUR = x.PriceInEUR,
                            PricePerSquareMeter = x.PricePerSquareMeter,
                            PricePerSquareMeterInEUR = x.PricePerSquareMeterInEUR,
                            IsTracked = x.TrackingUsers.Any(x => x.ApplicationUserId == currentUser.Id),
                            IsNewly = this.db.NewlySearchSetsBgProperties.Any(y => y.SearchSetId == searchSetId && y.BgPropertyId == x.Id),
                            Currency = x.Currency,
                            SearchSetId = searchSetId,
                            SearchSets = x.SearchSets.Select(y => new SearchSetViewModel()
                            {
                                Id = y.SearchSet.Id,
                                Name = y.SearchSet.Name,
                                Description = y.SearchSet.Description,
                            }).ToArray(),
                        })
                        .OrderByDescending(x => x.IsTracked)
                        .ThenByDescending(x => x.CreatedOn)
                        .ToListAsync();
            }
            else
            {
                //allNewBgProperties =
                //        await this.db.NewlyListedUsersBgProperties
                //        .Where(x => x.ApplicationUserId == currentUser.Id && x.BgProperty.IsNewlyFetched == true)
                //        .Select(x => x.BgProperty)
                //        .Select(x => new BgPropertyViewModel()
                //        {
                //            Id = x.Id,
                //            CreatedOn = x.CreatedOn.ToString(), // "n"
                //            Url = x.Url,
                //            Area = x.Area.ToString(),
                //            Floor = x.Floor.ToString(),
                //            PropertyType = x.PropertyType.ToString(),
                //            Location = x.Location.ToString(),
                //            TotalBuildingFloors = x.TotalBuildingFloors.ToString(),
                //            Description = x.Desctiption.ToString(),
                //            Price = x.Price,
                //            PriceInEUR = x.PriceInEUR,
                //            PricePerSquareMeter = x.PricePerSquareMeter,
                //            PricePerSquareMeterInEUR = x.PricePerSquareMeterInEUR,
                //            IsTracked = x.TrackingUsers.Any(x => x.ApplicationUserId == currentUser.Id),
                //            IsNewlyFetched = x.IsNewlyFetched,
                //            Currency = x.Currency,
                //            SearchSets = x.SearchSets.Select(y => new SearchSetViewModel()
                //            {
                //                Id = y.SearchSet.Id,
                //                Name = y.SearchSet.Name,
                //                Description = y.SearchSet.Description,
                //            }).ToArray(),
                //        })
                //        .OrderByDescending(x => x.IsTracked)
                //        .ThenByDescending(x => x.CreatedOn)
                //        .ToListAsync();

                var currentUserSearchSets =
                 await this.db.SearchSets.Where(x => x.ApplicationUserId == currentUser.Id).Select(x => x.Id).ToArrayAsync();

                allNewBgProperties = await this.db.BgProperties
                        //.Where(x =>
                        //        x.SearchSets.Any(y => y.SearchSet.ApplicationUserId == currentUser.Id)
                        //        && this.db.NewlySearchSetsBgProperties.Any(y => y.BgPropertyId == x.Id))
                        .Where(x =>
                                x.SearchSets.Any(y => y.SearchSet.ApplicationUserId == currentUser.Id)
                                && this.db.NewlySearchSetsBgProperties.Any(y => y.BgPropertyId == x.Id && currentUserSearchSets.Any(z => z == y.SearchSetId)))
                        .Select(x => new BgPropertyViewModel()
                        {
                            Id = x.Id,
                            CreatedOn = x.CreatedOn, // "n"
                            Url = x.Url,
                            Area = x.Area.ToString(),
                            Floor = x.Floor.ToString(),
                            PropertyType = x.PropertyType.ToString(),
                            Location = x.Location.ToString(),
                            TotalBuildingFloors = x.TotalBuildingFloors.ToString(),
                            Description = x.Desctiption.ToString(),
                            Price = x.Price,
                            PriceInEUR = x.PriceInEUR,
                            PricePerSquareMeter = x.PricePerSquareMeter,
                            PricePerSquareMeterInEUR = x.PricePerSquareMeterInEUR,
                            IsTracked = x.TrackingUsers.Any(x => x.ApplicationUserId == currentUser.Id),
                            IsNewly = this.db.NewlySearchSetsBgProperties.Any(y => y.BgPropertyId == x.Id && currentUserSearchSets.Any(z => z == y.SearchSetId)),
                            Currency = x.Currency,
                            SearchSets = x.SearchSets.Select(y => new SearchSetViewModel()
                            {
                                Id = y.SearchSet.Id,
                                Name = y.SearchSet.Name,
                                Description = y.SearchSet.Description,
                            }).ToArray(),
                        })
                        .OrderByDescending(x => x.IsTracked)
                        .ThenByDescending(x => x.CreatedOn)
                        .ToListAsync();
            }

            return new AllBgPropertiesViewModel()
            {
                BgProperties = allNewBgProperties,
                SearchSetId = searchSetId,
                SearchSetName = searchSetId != null ? this.db.SearchSets.FirstOrDefault(x => x.Id == searchSetId).Name : null,
            };
        }
    }
}
