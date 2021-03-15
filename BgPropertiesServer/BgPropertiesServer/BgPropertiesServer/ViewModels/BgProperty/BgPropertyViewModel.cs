namespace BgPropertiesServer.ViewModels.BgProperty
{
    using BgPropertiesServer.ViewModels.SearchSet;
    using System;
    using System.Collections.Generic;

    public class BgPropertyViewModel // : IMapFrom<BgProperty>
    {
        public string Id { get; set; }

        public DateTime CreatedOn { get; set; }

        public string Url { get; set; }

        public string Area { get; set; }

        public int? BuildingYear { get; set; }

        public string BuildingType { get; set; }

        public string Location { get; set; }

        public string PropertyType { get; set; }

        public string Floor { get; set; }

        public string TotalBuildingFloors { get; set; }

        public string Description { get; set; }

        public int? Price { get; set; }

        public int? PriceInEUR { get; set; }

        public string Currency { get; set; }

        public double? PricePerSquareMeter { get; set; }

        public double? PricePerSquareMeterInEUR { get; set; }

        public bool IsTracked { get; set; }

        public string SearchSetId { get; set; }

        public bool IsNewly { get; set; }

        public ICollection<SearchSetViewModel> SearchSets { get; set; }
    }
}
