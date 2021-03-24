namespace BgPropertiesServer.Services
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using BgPropertiesServer.Data;
    using System.Collections.Generic;
    using Microsoft.EntityFrameworkCore;
    using BgPropertiesServer.Data.Models;
    using BgPropertiesServer.ViewModels.BgProperty;
    using BgPropertiesServer.ViewModels.SearchCriteria;
    using BgPropertiesServer.ViewModels.SearchSet;

    public class BgPropertyService : IBgPropertyService
    {
        private readonly ApplicationDbContext db;

        public BgPropertyService(ApplicationDbContext db)
        {
            this.db = db;
        }

        public async Task<OneBgPropertyViewModel> GetBgPropertyByIdAsync(string bgPropertyId, string searchSetId, string currentUserId = null)
        {
            searchSetId = searchSetId != "undefined" ? searchSetId : null;

            //// Set this BgProperty as not Newly yet for this SearchSet.
            var newlyBgProperty = await this.db.NewlySearchSetsBgProperties.FirstOrDefaultAsync(x => x.SearchSetId == searchSetId && x.BgPropertyId == bgPropertyId);
            if (newlyBgProperty != null)
            {
                this.db.NewlySearchSetsBgProperties.Remove(newlyBgProperty);
                await this.db.SaveChangesAsync();
            }

            var property = await this.db.BgProperties
                        .Where(x => string.Equals(x.Id, bgPropertyId))
                        .Select(x => new BgPropertyDetailsViewModel()
                        {
                            Id = x.Id,
                            Url = x.Url,
                            CreatedOn = x.CreatedOn,
                            Description = x.Desctiption,
                            PropertyType = x.PropertyType.Name,
                            BuildingType = x.BuildingType.Name,
                            BuildingYear = x.BuildingYear,
                            Area = x.Area,
                            Floor = x.Floor,
                            TotalBuildingFloors = x.TotalBuildingFloors,
                            CourtyardArea = x.CourtyardArea,
                            Location = x.Location.ToString(),
                            Currency = x.Currency,
                            Price = x.Price,
                            PriceInEUR = x.PriceInEUR,
                            SearchSetId = searchSetId,
                            //IsTracked = this.db.ApplicationUsersBgProperties.Any(y => y.ApplicationUserId == currentUserId && y.BgPropertyId == bgPropertyId),
                            IsTracked = x.TrackingUsers.Any(y => y.ApplicationUserId == currentUserId && y.BgPropertyId == x.Id),
                            PricePerSquareMeter = x.PricePerSquareMeter,
                            PricePerSquareMeterInEUR = x.PricePerSquareMeterInEUR,
                            IsNewlyFetched = this.db.NewlySearchSetsBgProperties.Any(x => x.SearchSetId == searchSetId && x.BgPropertyId == bgPropertyId),
                        })
                        .FirstOrDefaultAsync();

            if (property == null)
            {
                return null;
            }

            if (currentUserId != null)
            {
                if (searchSetId != null)
                {
                    property.SearchSetId = searchSetId;
                    property.SearchSets =
                        await this.db.BgPropertiesSearchSets
                        .Where(x => x.BgPropertyId == bgPropertyId)
                        .Select(x => new SearchSetViewModel()
                        {
                            Id = x.SearchSetId,
                            Name = x.SearchSet.Name,
                            Description = x.BgProperty.Desctiption,
                        })
                        .ToArrayAsync();
                    property.SearchSetName = property.SearchSets.FirstOrDefault(x => x.Id == searchSetId).Name;
                }
                else
                {
                    property.SearchSetName = null;
                }

                var isTracked = this.db.ApplicationUsersBgProperties.FirstOrDefault(y => y.ApplicationUserId == currentUserId && y.BgPropertyId == bgPropertyId) != null ? true : false;
                property.IsTracked = isTracked;
            }

            return new OneBgPropertyViewModel()
            {
                BgProperty = property,
            };
        }

        public async Task<AllBgPropertiesViewModel> GetAllBgPropertiesBySearchSetAsync(string currentUserId, string searchSetId)
        {
            if (searchSetId == null)
            {
                throw new ArgumentException("There is no SearchSetId");
            }

            //// Validate if the current User posses this searchSet
            var searchSet = this.db.SearchSets.FirstOrDefault(x => x.Id == searchSetId && x.ApplicationUserId == currentUserId);
            if (searchSet == null)
            {
                throw new InvalidOperationException("This user is not allowed to operate with this SearchSet.");
            }

            var searchSetViewModel = await this.db.SearchSets
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
                    }).FirstOrDefaultAsync();

            var queryParamsCollection = searchSetViewModel.SearchCriterias.ToHashSet();

            var currentBgPropertyIds = await this.db.BgPropertiesSearchSets.Where(x => x.SearchSetId == searchSet.Id).Select(x => x.BgPropertyId).ToArrayAsync();

            //// All Bgproperties from Database according to the new query parameters.
            var dbBgProperties = await this.CreateBgPropertiesQueryFromDb(this.db, queryParamsCollection);

            //// Disattach all BgProperties from this SearchSet which do not compliant on the new criterias.
            foreach (var currentPropertyId in currentBgPropertyIds)
            {
                if (dbBgProperties.Any(x => x.Id == currentPropertyId))
                {
                    continue;
                }

                //// Disattach this BgProperty from this SearchSet
                var bgPropertySearchSetToDelete =
                    await this.db.BgPropertiesSearchSets
                        .FirstOrDefaultAsync(x => x.BgPropertyId == currentPropertyId && x.SearchSetId == searchSetId);
                this.db.BgPropertiesSearchSets.Remove(bgPropertySearchSetToDelete);

                //// Set this BgProperty not to be more newly for this one.
                var newlyBgPropertyToDelete =
                    await this.db.NewlySearchSetsBgProperties
                        .FirstOrDefaultAsync(x => x.BgPropertyId == currentPropertyId && x.SearchSetId == searchSetId);
                if (newlyBgPropertyToDelete != null)
                {
                    this.db.NewlySearchSetsBgProperties.Remove(newlyBgPropertyToDelete);
                }

                //// Un-Track this BgProperty if it not persists in any other SearchSets.
                var currentBgPropertySearchSetsIds = 
                    await this.db.BgPropertiesSearchSets.Where(x => x.BgPropertyId == currentPropertyId).Select(x => x.SearchSetId).ToArrayAsync();
                var isCheckedInOtherUserSearchSet = await this.db.SearchSets.AnyAsync(x => x.ApplicationUserId == currentUserId && currentBgPropertySearchSetsIds.Contains(x.Id));
                //    await this.db.ApplicationUsersBgProperties.FirstOrDefaultAsync(x => x.ApplicationUserId == currentUserId && x.BgPropertyId == currentPropertyId);
                if (currentBgPropertySearchSetsIds.Length == 0 || !isCheckedInOtherUserSearchSet)
                {
                    var applicationUserBgProperty =
                    await this.db.ApplicationUsersBgProperties
                                .FirstOrDefaultAsync(x => x.ApplicationUserId == currentUserId && x.BgPropertyId == currentPropertyId);
                    if (applicationUserBgProperty != null)
                    {
                        this.db.ApplicationUsersBgProperties.Remove(applicationUserBgProperty);
                    }
                }
            }

            await this.db.SaveChangesAsync();

            //// Attach all BgProperties which are compliant with the new criterias 
            //// and check them if they are Newly(not open to view full details) for the SearchSet.
            foreach (var property in dbBgProperties)
            {
                var bgPropertySearchSet
                        = await this.db.BgPropertiesSearchSets
                               .FirstOrDefaultAsync(x => x.BgPropertyId == property.Id && x.SearchSetId == searchSetId);

                var isBgPropertyNewly = this.db.NewlySearchSetsBgProperties.Any(x => x.SearchSetId == searchSetId && x.BgPropertyId == property.Id);

                if (bgPropertySearchSet == null)
                {
                    // Attach this BgProperty to the current SearchSet.
                    await this.db.BgPropertiesSearchSets.AddAsync(new BgPropertySearchSet()
                    {
                        BgPropertyId = property.Id,
                        SearchSetId = searchSetId,
                    });

                    // Mark this BgProperty as Newly for the current SearchSet.
                    if (isBgPropertyNewly == false)
                    {
                        await this.db.NewlySearchSetsBgProperties.AddAsync(new NewlySearchSetBgProperty()
                        {
                            SearchSetId = searchSet.Id,
                            BgPropertyId = property.Id,
                        });
                    }
                }
            }

            await this.db.SaveChangesAsync();

            var bgProperties = dbBgProperties.Select(x => new BgPropertyViewModel()
            {
                Id = x.Id,
                CreatedOn = x.CreatedOn,
                Url = x.Url,
                Area = x.Area.ToString(),
                BuildingYear = x.BuildingYear,
                BuildingType = this.db.BuildingTypes.FirstOrDefault(y => y.Id == x.BuildingTypeId).ToString(),
                Floor = x.Floor.ToString(),
                PropertyType = this.db.PropertyTypes.FirstOrDefault(y => y.Id == x.PropertyTypeId).ToString(),
                Location = this.db.Locations.FirstOrDefault(y => y.Id == x.LocationId).ToString(),
                TotalBuildingFloors = x.TotalBuildingFloors.ToString(),
                Description = x.Desctiption,
                CourtyardArea = x.CourtyardArea,
                Price = x.Price,
                PriceInEUR = x.PriceInEUR,
                PricePerSquareMeter = x.PricePerSquareMeter,
                PricePerSquareMeterInEUR = x.PricePerSquareMeterInEUR,
                IsTracked = this.db.ApplicationUsersBgProperties.Any(y => y.ApplicationUserId == currentUserId && y.BgPropertyId == x.Id),
                SearchSetId = searchSetId,
                IsNewly = this.db.NewlySearchSetsBgProperties.Any(y => y.SearchSetId == searchSetId && y.BgPropertyId == x.Id),
                Currency = x.Currency,
            })
            .OrderByDescending(x => x.IsTracked)
            .ThenByDescending(x => x.IsNewly)
            .ThenBy(x => x.CreatedOn)
            .ToList();

            return new AllBgPropertiesViewModel()
            {
                BgProperties = bgProperties,
                SearchSetId = searchSetId,
                SearchSetName = searchSet.Name,
            };
        }

        public async Task TrackBgPropertyAsync(ApplicationUser currentUser, string bgPropertyId)
        {
            var applicationUserBgProperty =
                    await this.db.ApplicationUsersBgProperties
                                .FirstOrDefaultAsync(x => x.ApplicationUserId == currentUser.Id && x.BgPropertyId == bgPropertyId);

            var bgProperty = await this.db.BgProperties.FirstOrDefaultAsync(x => x.Id == bgPropertyId);

            if (applicationUserBgProperty != null)
            {
                this.db.ApplicationUsersBgProperties.Remove(applicationUserBgProperty);
            }
            else
            {
                await this.db.ApplicationUsersBgProperties.AddAsync(new ApplicationUserBgProperty()
                {
                    ApplicationUser = currentUser,
                    BgPropertyId = bgPropertyId,
                });
            }

            await this.db.SaveChangesAsync();
        }

        public async Task<AllBgPropertiesViewModel> GetAllTrackedBgPropertiesBySearchSetAsync(ApplicationUser currentUser, string searchSetId)
        {
            if (searchSetId == null)
            {
                throw new ArgumentException("There is no searchSetId.");
            }

            var userAllTrackedBgPropertyIds =
                        await this.db.ApplicationUsersBgProperties
                            .Where(x => x.ApplicationUserId == currentUser.Id)
                            .Select(x => x.BgPropertyId)
                            .ToArrayAsync();

            //// Separated usage of LINQ needed here tests to work corrctly.
            var userAllTrackedBgProperiesFiltered =
                        await this.db.BgProperties
                            .Where(x => userAllTrackedBgPropertyIds.Any(y => y == x.Id))
                            .Where(x => x.SearchSets.Any(y => y.SearchSetId == searchSetId))
                            .ToArrayAsync();
            var userAllTrackedBgProperies = userAllTrackedBgProperiesFiltered.Select(x => new BgPropertyViewModel()
            {
                Id = x.Id,
                CreatedOn = x.CreatedOn,
                Url = x.Url,
                Area = x.Area.ToString(),
                BuildingYear = x.BuildingYear,
                BuildingType = this.db.BuildingTypes.FirstOrDefault(y => y.Id == x.BuildingTypeId).ToString(),
                Floor = x.Floor.ToString(),
                PropertyType = this.db.PropertyTypes.FirstOrDefault(y => y.Id == x.PropertyTypeId).ToString(),
                Location = this.db.Locations.FirstOrDefault(y => y.Id == x.LocationId).ToString(),
                TotalBuildingFloors = x.TotalBuildingFloors.ToString(),
                Description = x.Desctiption,
                CourtyardArea = x.CourtyardArea,
                Price = x.Price,
                PriceInEUR = x.PriceInEUR,
                PricePerSquareMeter = x.PricePerSquareMeter,
                PricePerSquareMeterInEUR = x.PricePerSquareMeterInEUR,
                IsTracked = this.db.ApplicationUsersBgProperties.Any(y => y.ApplicationUserId == currentUser.Id && y.BgPropertyId == x.Id),
                SearchSetId = searchSetId,
                IsNewly = this.db.NewlySearchSetsBgProperties.Any(y => y.SearchSetId == searchSetId && y.BgPropertyId == x.Id),
                Currency = x.Currency,
            })
            .ToArray();

            var userAllBgPropertiesTrackedFromCurrentSearchSet = userAllTrackedBgProperies
                .Where(x => x.SearchSetId == searchSetId)
                .OrderByDescending(x => x.IsNewly)
                .ThenBy(x => x.CreatedOn)
                .ToArray();

            var searchSet = await this.db.SearchSets.FirstOrDefaultAsync(x => x.Id == searchSetId);

            return new AllBgPropertiesViewModel()
            {
                SearchSetId = searchSetId,
                SearchSetName = searchSet?.Name ?? string.Empty,
                // BgProperties = userAllBgPropertiesTrackedFromCurrentSearchSet,
                BgProperties = userAllTrackedBgProperies,
            };
        }

        public async Task<AllBgPropertiesViewModel> GetAllTrackedBgPropertiesByUserAsync(ApplicationUser currentUser)
        {
            //// Separated usage of LINQ needed here tests to work corrctly.
            var userAllTrackedBgPropertyFiltered =
                        await this.db.ApplicationUsersBgProperties
                        .Where(x => x.ApplicationUserId == currentUser.Id)
                        .Select(x => x.BgProperty)
                        .ToArrayAsync();
            var userAllTrackedBgProperty = userAllTrackedBgPropertyFiltered.Select(x => new BgPropertyViewModel()
            {
                //Id = x.Id,
                //Url = x.Url,
                //Area = x.Area.ToString(),
                //Floor = x.Floor.ToString(),
                //PropertyType = this.db.PropertyTypes.FirstOrDefault(y => y.Id == x.PropertyTypeId).Name,
                //Location = this.db.Locations.FirstOrDefault(y => y.Id == x.LocationId).ToString(),
                //TotalBuildingFloors = x.TotalBuildingFloors.ToString(),
                //Description = x.Desctiption.ToString(),
                //Price = x.Price,
                //PriceInEUR = x.PriceInEUR,
                //PricePerSquareMeter = x.PricePerSquareMeter,
                //PricePerSquareMeterInEUR = x.PricePerSquareMeterInEUR,
                //IsTracked = x.TrackingUsers.Any(x => x.ApplicationUserId == currentUser.Id),
                //IsNewly = this.db.NewlySearchSetsBgProperties.Any(y => y.BgPropertyId == x.Id),
                //Currency = x.Currency,
                Id = x.Id,
                CreatedOn = x.CreatedOn,
                Url = x.Url,
                Area = x.Area.ToString(),
                BuildingYear = x.BuildingYear,
                BuildingType = this.db.BuildingTypes.FirstOrDefault(y => y.Id == x.BuildingTypeId).ToString(),
                Floor = x.Floor.ToString(),
                PropertyType = this.db.PropertyTypes.FirstOrDefault(y => y.Id == x.PropertyTypeId).ToString(),
                Location = this.db.Locations.FirstOrDefault(y => y.Id == x.LocationId).ToString(),
                TotalBuildingFloors = x.TotalBuildingFloors.ToString(),
                Description = x.Desctiption,
                CourtyardArea = x.CourtyardArea,
                Price = x.Price,
                PriceInEUR = x.PriceInEUR,
                PricePerSquareMeter = x.PricePerSquareMeter,
                PricePerSquareMeterInEUR = x.PricePerSquareMeterInEUR,
                IsTracked = this.db.ApplicationUsersBgProperties.Any(y => y.ApplicationUserId == currentUser.Id && y.BgPropertyId == x.Id),
                //IsNewly = this.db.NewlySearchSetsBgProperties.Any(y => y.SearchSetId == searchSetId && y.BgPropertyId == x.Id),
                IsNewly = this.db.NewlySearchSetsBgProperties.Any(y => y.BgPropertyId == x.Id),
                Currency = x.Currency,
            })
            .OrderByDescending(x => x.IsNewly)
            .ThenBy(x => x.CreatedOn)
            .ToArray();

            return new AllBgPropertiesViewModel()
            {
                BgProperties = userAllTrackedBgProperty,
            };
        }

        private async Task<ICollection<BgProperty>> CreateBgPropertiesQueryFromDb(ApplicationDbContext dbContext, HashSet<SearchCriteriaViewModel> queryParamsCollection)
        {
            // TODO мога да сложа тук филтър за isDeleted == 1
            var query = dbContext.BgProperties.AsQueryable();

            //// Set property types query params
            var propertyTypesQueryParamValues = queryParamsCollection
                            .Where(x => !string.IsNullOrEmpty(x.Value) && x.Name.EndsWith("PropType") && x.Value != "БИЗНЕС ИМОТ")
                            .Select(x => x.Value)
                            .ToArray();
            if (propertyTypesQueryParamValues.Length > 0)
            {
                query = query.Where(x => propertyTypesQueryParamValues.Any(y => y == x.PropertyType.Name));
            }

            //// Set query params associated with place, area, floor and business
            var placeAreaFloorBusinessQueryParams = queryParamsCollection.Where(x => !string.IsNullOrEmpty(x.Value)).ToArray();
            foreach (var queryParam in placeAreaFloorBusinessQueryParams)
            {
                //// Set City/Region query param
                if (queryParam.Name == "cityRegion")
                {
                    var queryLocationPartsCollection = queryParam.Value.Trim().Split(" ", 2, StringSplitOptions.RemoveEmptyEntries);
                    var placeType = queryLocationPartsCollection[0];
                    var value = queryLocationPartsCollection[1];
                    if (placeType == "град")
                    {
                        query = query.Where(x => x.Location.PlaceType == placeType);
                        query = query.Where(x => x.Location.PopulatedPlace == value);
                    }
                    else //// placeType == "област"
                    {
                        query = query.Where(x => x.Location.Region == value);
                    }
                }
                else if (queryParam.Name == "sizeFrom" || queryParam.Name == "sizeTo") //// Set SizeFrom/SizeTo query param
                {
                    if (queryParam.Name == "sizeFrom")
                    {
                        query = query.Where(x => x.Area >= double.Parse(queryParam.Value));
                    }
                    else //// queryParam.Name == "sizeTo"
                    {
                        query = query.Where(x => x.Area <= double.Parse(queryParam.Value));
                    }
                }
                else if (queryParam.Value == "БИЗНЕС ИМОТ") //// Set property type "БИЗНЕС ИМОТ" query param
                {
                    query = query.Where(x => x.PropertyType.Name.StartsWith("Бизнес имот-"));
                }
                else if (queryParam.Name == "floorFrom" || queryParam.Name == "floorTo")
                {
                    if (queryParam.Name == "floorFrom")
                    {
                        query = query.Where(x => x.Floor >= int.Parse(queryParam.Value));
                    }
                    else //// queryParam.Name == "floorTo"
                    {
                        query = query.Where(x => x.Floor <= int.Parse(queryParam.Value));
                    }
                }
            }

            var priceAssociatedQueryParams = queryParamsCollection.Where(x => !string.IsNullOrEmpty(x.Value) && x.Name.StartsWith("price")).ToArray();
            foreach (var queryParam in priceAssociatedQueryParams)
            {
                if (queryParam.Name == "priceFrom" || queryParam.Name == "priceTo")
                {
                    if (queryParam.Name == "priceFrom")
                    {
                        //// Take the Bg Properties with price=null too.
                        query = query.Where(x => x.Price == null || x.PriceInEUR >= int.Parse(queryParam.Value));
                    }
                    else //// queryParam.Name == "priceTo"
                    {
                        //// Take the Bg Properties with price=null too.
                        query = query.Where(x => x.Price == null || x.PriceInEUR <= int.Parse(queryParam.Value));
                    }
                }
                else if (queryParam.Name == "pricePerSqrMFrom" || queryParam.Name == "pricePerSqrMTo")
                {
                    if (queryParam.Name == "pricePerSqrMFrom")
                    {
                        //// Take the Bg Properties with price=null too.
                        query = query.Where(x => x.Price == null || x.PricePerSquareMeterInEUR >= double.Parse(queryParam.Value));
                    }
                    else //// queryParam.Name == "pricePerSqrMTo"
                    {
                        //// Take the Bg Properties with price=null too.
                        query = query.Where(x => x.Price == null || x.PricePerSquareMeterInEUR <= double.Parse(queryParam.Value));
                    }
                }
            }

            var filteredBgProperties = await query.ToArrayAsync();

            return filteredBgProperties;
        }
    }
}
