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
    public partial class BgProperty : IAuditInfo, IDeletableEntity
    {
        public BgProperty()
        {
            this.Id = Guid.NewGuid().ToString();
            this.AdditionalFeaturesBgProperties = new HashSet<AdditionalFeatureBgProperty>();
            this.TrackingUsers = new HashSet<ApplicationUserBgProperty>();
            this.AssetsBgProperties = new HashSet<AssetBgProperty>();
            this.SearchSets = new HashSet<BgPropertySearchSet>();
            this.NewlySearchSetsBgProperties = new HashSet<NewlySearchSetBgProperty>();
        }

        [Key]
        public string Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? DeletedOn { get; set; }
        [Required]
        public string AdvIdentity { get; set; }
        [Required]
        public string Url { get; set; }
        public double? Area { get; set; }
        public int? BuildingYear { get; set; }
        public int? Floor { get; set; }
        public int? TotalBuildingFloors { get; set; }
        public int? CourtyardArea { get; set; }
        public bool? IsWithGas { get; set; }
        public bool? IsWithCentalHeatingStation { get; set; }
        public int? PropertyTypeId { get; set; }
        public int? BuildingTypeId { get; set; }
        public int LocationId { get; set; }
        public int? Price { get; set; }
        [Column("PriceInEUR")]
        public int? PriceInEUR { get; set; }
        public string Currency { get; set; }
        public string Desctiption { get; set; }
        [Required]
        public string Action { get; set; }
        public bool HasPicture { get; set; }
        public bool HasVideo { get; set; }
        public int OfferVisited { get; set; }
        public DateTime? OfferPublishedOn { get; set; }
        public DateTime? OfferChangedOn { get; set; }
        public bool IsTopOffer { get; set; }
        public bool IsNewOffer { get; set; }
        public bool IsTracked { get; set; }
        public double? PricePerSquareMeter { get; set; }
        [Column("PricePerSquareMeterInEUR")]
        public double? PricePerSquareMeterInEUR { get; set; }

        [ForeignKey(nameof(BuildingTypeId))]
        [InverseProperty(nameof(Models.BuildingType.BgProperties))]
        public virtual BuildingType BuildingType { get; set; }
        [ForeignKey(nameof(LocationId))]
        [InverseProperty(nameof(Models.Location.BgProperties))]
        public virtual Location Location { get; set; }
        [ForeignKey(nameof(PropertyTypeId))]
        [InverseProperty(nameof(Models.PropertyType.BgProperties))]
        public virtual PropertyType PropertyType { get; set; }
        [InverseProperty("BgProperty")]
        public virtual ICollection<AdditionalFeatureBgProperty> AdditionalFeaturesBgProperties { get; set; }
        [InverseProperty("BgProperty")]
        // Intermediate tables usefull when operates with on BgProperty
        public virtual ICollection<ApplicationUserBgProperty> TrackingUsers { get; set; }
        [InverseProperty("BgProperty")]
        public virtual ICollection<AssetBgProperty> AssetsBgProperties { get; set; }
        [InverseProperty("BgProperty")]
        public virtual ICollection<BgPropertySearchSet> SearchSets { get; set; }
        [InverseProperty("BgProperty")]
        public virtual ICollection<NewlySearchSetBgProperty> NewlySearchSetsBgProperties { get; set; }
    }
}
