namespace BgPropertiesServer.ViewModels.BgProperty
{
    using BgPropertiesServer.ViewModels.SearchSet;
    using System;
    using System.Collections.Generic;


    public class BgPropertyDetailsViewModel
    {
        public string Id { get; set; }

        public string Url { get; set; }

        public DateTime CreatedOn { get; set; }

        public double? Area { get; set; }

        public int? BuildingYear { get; set; }

        public int? Floor { get; set; }

        public int? TotalBuildingFloors { get; set; }

        public int? CourtyardArea { get; set; }

        public string PropertyType { get; set; }

        public string BuildingType { get; set; }

        public string Location { get; set; }

        public int? Price { get; set; }

        public int? PriceInEUR { get; set; }

        public string Currency { get; set; }

        public string Description { get; set; }

        public bool? IsTracked { get; set; }

        public bool IsNewlyFetched { get; set; }

        public double? PricePerSquareMeter { get; set; }

        public double? PricePerSquareMeterInEUR { get; set; }

        public string SearchSetId { get; set; }

        public string SearchSetName { get; set; }

        public ICollection<SearchSetViewModel> SearchSets { get; set; }
    }
}
