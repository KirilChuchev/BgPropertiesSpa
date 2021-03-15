namespace BgPropertiesServer.Helpers
{
    using BgPropertiesServer.ViewModels;
    using BgPropertiesServer.ViewModels.SearchCriteria;
    using System.Collections.Generic;

    public static class HelpMethods
    {
        // TODO: To try implement with Reflection
        public static IEnumerable<SearchCriteriaViewModel> GetFullfilledSearchCriterias(BaseInputViewModel instance)
        {
            var searchCriterias = new HashSet<SearchCriteriaViewModel>()
            {
                new SearchCriteriaViewModel() { Name = "oneRoomPropType", Value = (instance.OneRoomPropType != "on") ? null : "1-СТАЕН" },
                new SearchCriteriaViewModel() { Name = "twoRoomsPropType", Value = (instance.TwoRoomsPropType != "on") ? null : "2-СТАЕН" },
                new SearchCriteriaViewModel() { Name = "threeRoomsPropType", Value = (instance.ThreeRoomsPropType != "on") ? null : "3-СТАЕН" },
                new SearchCriteriaViewModel() { Name = "fourRoomsPropType", Value = (instance.FourRoomsPropType != "on") ? null : "4-СТАЕН" },
                new SearchCriteriaViewModel() { Name = "multiRoomsPropType", Value = (instance.MultiRoomsPropType != "on") ? null : "МНОГОСТАЕН" },
                new SearchCriteriaViewModel() { Name = "maisonettePropType", Value = (instance.MaisonettePropType != "on") ? null : "МЕЗОНЕТ" },
                new SearchCriteriaViewModel() { Name = "studioPropType", Value = (instance.StudioPropType != "on") ? null : "АТЕЛИЕ, ТАВАН" },
                new SearchCriteriaViewModel() { Name = "officePropType", Value = (instance.OfficePropType != "on") ? null : "ОФИС" },
                new SearchCriteriaViewModel() { Name = "storePropType", Value = (instance.StorePropType != "on") ? null : "МАГАЗИН" },
                new SearchCriteriaViewModel() { Name = "restaurantPropType", Value = (instance.RestaurantPropType != "on") ? null : "ЗАВЕДЕНИЕ" },
                new SearchCriteriaViewModel() { Name = "warehousePropType", Value = (instance.WarehousePropType != "on") ? null : "СКЛАД" },
                new SearchCriteriaViewModel() { Name = "hotelPropType", Value = (instance.HotelPropType != "on") ? null : "ХОТЕЛ" },
                new SearchCriteriaViewModel() { Name = "industrialPropType", Value = (instance.IndustrialPropType != "on") ? null : "ПРОМ. ПОМЕЩЕНИЕ" },
                new SearchCriteriaViewModel() { Name = "businessPropType", Value = (instance.BusinessPropType != "on") ? null : "БИЗНЕС ИМОТ" },
                new SearchCriteriaViewModel() { Name = "houseFloorPropType", Value = (instance.HouseFloorPropType != "on") ? null : "ЕТАЖ ОТ КЪЩА" },
                new SearchCriteriaViewModel() { Name = "housePropType", Value = (instance.HousePropType != "on") ? null : "КЪЩА" },
                new SearchCriteriaViewModel() { Name = "villagePropType", Value = (instance.VillagePropType != "on") ? null : "ВИЛА" },
                new SearchCriteriaViewModel() { Name = "plotPropType", Value = (instance.PlotPropType != "on") ? null : "ПАРЦЕЛ" },
                new SearchCriteriaViewModel() { Name = "garagePropType", Value = (instance.GaragePropType != "on") ? null : "ГАРАЖ" },
                new SearchCriteriaViewModel() { Name = "landPropType", Value = (instance.LandPropType != "on") ? null : "ЗЕМЕДЕЛСКА ЗЕМЯ" },
                new SearchCriteriaViewModel() { Name = "priceFrom", Value = instance.PriceFrom?.Trim() },
                new SearchCriteriaViewModel() { Name = "priceTo", Value = instance.PriceTo?.Trim() },
                new SearchCriteriaViewModel() { Name = "pricePerSqrMFrom", Value = instance.PricePerSqrMFrom?.Trim() },
                new SearchCriteriaViewModel() { Name = "pricePerSqrMTo", Value = instance.PricePerSqrMTo?.Trim() },
                new SearchCriteriaViewModel() { Name = "sizeFrom", Value = instance.SizeFrom?.Trim() },
                new SearchCriteriaViewModel() { Name = "sizeTo", Value = instance.SizeTo?.Trim() },
                new SearchCriteriaViewModel() { Name = "floorFrom", Value = instance.FloorFrom?.Trim() },
                new SearchCriteriaViewModel() { Name = "floorTo", Value = instance.FloorTo?.Trim() },
                new SearchCriteriaViewModel() { Name = "cityRegion", Value = instance.CityRegion?.Trim() },
            };

            var notNullSerachCriteriasDict = new HashSet<SearchCriteriaViewModel>();

            foreach (var searchCriteria in searchCriterias)
            {
                if (searchCriteria.Value != null)
                {
                    notNullSerachCriteriasDict.Add(searchCriteria);
                }
            }

            return notNullSerachCriteriasDict;
        }
    }
}
