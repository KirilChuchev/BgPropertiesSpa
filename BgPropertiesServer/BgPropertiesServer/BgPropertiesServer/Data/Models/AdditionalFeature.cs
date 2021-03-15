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
    public partial class AdditionalFeature : IAuditInfo, IDeletableEntity
    {
        public AdditionalFeature()
        {
            AdditionalFeaturesBgProperties = new HashSet<AdditionalFeatureBgProperty>();
        }

        [Key]
        public int Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? DeletedOn { get; set; }
        [Required]
        public string Name { get; set; }

        [InverseProperty("AdditionalFeature")]
        public virtual ICollection<AdditionalFeatureBgProperty> AdditionalFeaturesBgProperties { get; set; }
    }
}
