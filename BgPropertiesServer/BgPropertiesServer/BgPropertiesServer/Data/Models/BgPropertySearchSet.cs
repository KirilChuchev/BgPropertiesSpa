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
    public partial class BgPropertySearchSet : IAuditInfo, IDeletableEntity
    {
        [Key]
        public int Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? DeletedOn { get; set; }
        public string BgPropertyId { get; set; }
        public string SearchSetId { get; set; }

        [ForeignKey(nameof(BgPropertyId))]
        [InverseProperty(nameof(Models.BgProperty.SearchSets))]
        public virtual BgProperty BgProperty { get; set; }
        [ForeignKey(nameof(SearchSetId))]
        [InverseProperty(nameof(Models.SearchSet.BgPropertiesSearchSets))]
        public virtual SearchSet SearchSet { get; set; }
    }
}
