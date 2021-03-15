namespace BgPropertiesServer.ViewModels.BgProperty
{
    using BgPropertiesServer.ViewModels.Partial;
    using BgPropertiesServer.ViewModels.SearchCriteria;
    using System.Collections.Generic;


    public class AllBgPropertiesViewModel
    {
        public string SearchSetId { get; set; }

        public string SearchSetName { get; set; }

        public ICollection<BgPropertyViewModel> BgProperties { get; set; }

        public HashSet<SearchCriteriaViewModel> QueryParamsCollection { get; set; }

        public BgPropertiesTitlePartialViewModel PartialModel { get; set; }
    }
}
