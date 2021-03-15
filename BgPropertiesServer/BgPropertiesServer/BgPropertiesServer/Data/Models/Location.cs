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
    public partial class Location : IAuditInfo, IDeletableEntity
    {
        public Location()
        {
            BgProperties = new HashSet<BgProperty>();
        }

        [Key]
        public int Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? DeletedOn { get; set; }
        [Required]
        public string PopulatedPlace { get; set; }
        public string Region { get; set; }
        [Required]
        public string PlaceType { get; set; }
        public string District { get; set; }
        public string Street { get; set; }
        public string AdditionalInfo { get; set; }

        [InverseProperty("Location")]
        public virtual ICollection<BgProperty> BgProperties { get; set; }

        public override string ToString()
        {
            var placeType = this.PlaceType != "" ? this.PlaceType + " " : "";
            var populatedPlace = this.PopulatedPlace != "" ? this.PopulatedPlace : "";
            var region = this.Region != "" ? ", област " + this.Region : "";
            var district = this.District != "" ? ", квартал " + this.District : "";
            var street = this.Street != "" ? ", " + this.Street : "";
            var additionalInfo = this.AdditionalInfo != "" ? ", подробности: " + this.AdditionalInfo : "";

            return $"{placeType}{populatedPlace}{region}{district}{street}{additionalInfo}";
        }
    }
}
