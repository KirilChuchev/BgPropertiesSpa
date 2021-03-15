namespace BgPropertiesServer.ViewModels.SearchSet
{
    using BgPropertiesServer.ViewModels.SearchCriteria;
    using System;
    using System.Collections.Generic;


    public class SearchSetViewModel
    {
        public SearchSetViewModel()
        {
            this.SearchCriterias = new HashSet<SearchCriteriaViewModel>();
        }

        public string Id { get; set; }

        public DateTime CreatedOn { get; set; }

        public string Name { get; set; }

        public bool IsInCheckingMode { get; set; }

        public string Description { get; set; }
        public int BgPropertiesCount { get; set; }

        public ICollection<SearchCriteriaViewModel> SearchCriterias { get; set; }
    }
}
