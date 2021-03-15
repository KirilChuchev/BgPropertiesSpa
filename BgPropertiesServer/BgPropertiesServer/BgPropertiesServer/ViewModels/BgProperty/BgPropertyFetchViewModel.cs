namespace BgPropertiesServer.ViewModels.BgProperty
{
    using BgPropertiesServer.Data.Models;
    public class BgPropertyFetchViewModel
    {
        ////  Url = url,
        //  AdvIdentity = propertyAdvIdentity,
        //  Area = propertyArea,
        //  Location = propertyLocation,
        //  PropertyType = propertyType,
        //  Floor = propertyFloor,
        //  TotalBuildingFloors = totalBuildingFloors,
        //  Price = price,
        //  //BuildingType = propertyBuildingType,
        //  BuildingYear = propertyBuildingYear,
        //  Action = "Продава",
        //  HasPicture = true,
        //  HasVideo = false,
        //  IsWithGas = false,
        //  OfferVisited = 1000
        public string Url { get; set; }

        public string AdvIdentity { get; set; }

        public double? Area { get; set; }

        public Location Location { get; set; }

        public PropertyType PropertyType { get; set; }

        public int Floor { get; set; }

        public int TotalBuildingFloors { get; set; }

        public int? Price { get; set; }

        public string Currency { get; set; }

        public BuildingType BuildingType { get; set; }

        public string Description { get; set; }

        public int? BuildingYear { get; set; }

        public string Action { get; set; }

        public bool HasPicture { get; set; }

        public bool HasVideo { get; set; }

        public bool? IsWithGas { get; set; }

        public int OfferVisited { get; set; }
    }
}
