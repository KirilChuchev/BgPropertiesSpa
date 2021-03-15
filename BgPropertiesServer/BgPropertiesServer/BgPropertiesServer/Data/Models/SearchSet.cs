using BgProperties.Data.Models.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace BgPropertiesServer.Data.Models
{
    public partial class SearchSet : IAuditInfo, IDeletableEntity
    {
        public SearchSet()
        {
            this.Id = Guid.NewGuid().ToString();
            this.BgPropertiesSearchSets = new HashSet<BgPropertySearchSet>();
            this.NewlySearchSetsBgProperties = new HashSet<NewlySearchSetBgProperty>();
            this.CriteriasCollection = new HashSet<SearchCriteriaSearchSet>();
        }

        [Key]
        public string Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? DeletedOn { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public string ApplicationUserId { get; set; }
        public bool IsInCheckingMode { get; set; }

        [ForeignKey(nameof(ApplicationUserId))]
        [InverseProperty(nameof(Models.ApplicationUser.SearchSets))]
        public virtual ApplicationUser ApplicationUser { get; set; }
        [InverseProperty("SearchSet")]
        public virtual ICollection<BgPropertySearchSet> BgPropertiesSearchSets { get; set; }
        [InverseProperty("SearchSet")]
        public virtual ICollection<NewlySearchSetBgProperty> NewlySearchSetsBgProperties { get; set; }
        [InverseProperty("SearchSet")]
        public virtual ICollection<SearchCriteriaSearchSet> CriteriasCollection { get; set; }
    }
}
