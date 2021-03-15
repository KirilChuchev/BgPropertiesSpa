﻿using BgProperties.Data.Models.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace BgPropertiesServer.Data.Models
{
    public partial class SearchCriteria : IAuditInfo, IDeletableEntity
    {
        public SearchCriteria()
        {
            SearchCriteriasSearchSets = new HashSet<SearchCriteriaSearchSet>();
        }

        [Key]
        public int Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? DeletedOn { get; set; }
        [Required]
        public string Name { get; set; }
        public string Value { get; set; }

        [InverseProperty("SearchCriteria")]
        public virtual ICollection<SearchCriteriaSearchSet> SearchCriteriasSearchSets { get; set; }
    }
}
