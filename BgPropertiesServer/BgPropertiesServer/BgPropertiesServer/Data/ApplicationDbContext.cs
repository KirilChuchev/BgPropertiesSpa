using System;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using BgProperties.Data.Models.Common;
using BgPropertiesServer.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace BgPropertiesServer.Data
{
    public partial class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
        {
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AdditionalFeature> AdditionalFeatures { get; set; }
        public virtual DbSet<AdditionalFeatureBgProperty> AdditionalFeaturesBgProperties { get; set; }
        public virtual DbSet<ApplicationUserBgProperty> ApplicationUsersBgProperties { get; set; }
        public virtual DbSet<ApplicationUser> AspNetUsers { get; set; }
        public virtual DbSet<Asset> Assets { get; set; }
        public virtual DbSet<AssetBgProperty> AssetsBgProperties { get; set; }
        public virtual DbSet<BgProperty> BgProperties { get; set; }
        public virtual DbSet<BgPropertySearchSet> BgPropertiesSearchSets { get; set; }
        public virtual DbSet<BuildingType> BuildingTypes { get; set; }
        public virtual DbSet<Location> Locations { get; set; }
        public virtual DbSet<NewlySearchSetBgProperty> NewlySearchSetsBgProperties { get; set; }
        public virtual DbSet<PropertyType> PropertyTypes { get; set; }
        public virtual DbSet<SearchCriteria> SearchCriterias { get; set; }
        public virtual DbSet<SearchCriteriaSearchSet> SearchCriteriasSearchSets { get; set; }
        public virtual DbSet<SearchSet> SearchSets { get; set; }

//        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//        {
//            if (!optionsBuilder.IsConfigured)
//            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
//                optionsBuilder.UseSqlServer("Server=.;Database=BgPropertiesApiDb;Integrated Security=true");
//            }
//        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Set global query filter for not deleted entities only
            var entityTypes = modelBuilder.Model.GetEntityTypes().ToList();
            var deletableEntityTypes = entityTypes
                .Where(et => et.ClrType != null && typeof(IDeletableEntity).IsAssignableFrom(et.ClrType));
            foreach (var deletableEntityType in deletableEntityTypes)
            {
                var method = SetIsDeletedQueryFilterMethod.MakeGenericMethod(deletableEntityType.ClrType);
                method.Invoke(null, new object[] { modelBuilder });
            }

            // Disable cascade delete
            var foreignKeys = entityTypes
                .SelectMany(e => e.GetForeignKeys().Where(f => f.DeleteBehavior == DeleteBehavior.Cascade));
            foreach (var foreignKey in foreignKeys)
            {
                foreignKey.DeleteBehavior = DeleteBehavior.Restrict;
            }


            modelBuilder.Entity<AdditionalFeature>(entity =>
            {
                entity.HasIndex(e => e.IsDeleted);
            });

            modelBuilder.Entity<AdditionalFeatureBgProperty>(entity =>
            {
                entity.HasIndex(e => e.AdditionalFeatureId);

                entity.HasIndex(e => e.BgPropertyId);

                entity.HasIndex(e => e.IsDeleted);

                entity.HasOne(d => d.AdditionalFeature)
                    .WithMany(p => p.AdditionalFeaturesBgProperties)
                    .HasForeignKey(d => d.AdditionalFeatureId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<ApplicationUserBgProperty>(entity =>
            {
                entity.HasIndex(e => e.ApplicationUserId);

                entity.HasIndex(e => e.BgPropertyId);

                entity.HasIndex(e => e.IsDeleted);
            });

            modelBuilder.Entity<ApplicationUser>(entity =>
            {
                entity.HasIndex(e => e.IsDeleted);

                entity.HasIndex(e => e.NormalizedEmail)
                    .HasName("EmailIndex");

                entity.HasIndex(e => e.NormalizedUserName)
                    .HasName("UserNameIndex")
                    .IsUnique()
                    .HasFilter("([NormalizedUserName] IS NOT NULL)");
            });

            modelBuilder.Entity<Asset>(entity =>
            {
                entity.HasIndex(e => e.IsDeleted);
            });

            modelBuilder.Entity<AssetBgProperty>(entity =>
            {
                entity.HasIndex(e => e.AssetId);

                entity.HasIndex(e => e.BgPropertyId);

                entity.HasIndex(e => e.IsDeleted);

                entity.HasOne(d => d.Asset)
                    .WithMany(p => p.AssetsBgProperties)
                    .HasForeignKey(d => d.AssetId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<BgProperty>(entity =>
            {
                entity.HasIndex(e => e.BuildingTypeId);

                entity.HasIndex(e => e.IsDeleted);

                entity.HasIndex(e => e.LocationId);

                entity.HasIndex(e => e.PropertyTypeId);

                entity.HasOne(d => d.Location)
                    .WithMany(p => p.BgProperties)
                    .HasForeignKey(d => d.LocationId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<BgPropertySearchSet>(entity =>
            {
                entity.HasIndex(e => e.BgPropertyId);

                entity.HasIndex(e => e.IsDeleted);

                entity.HasIndex(e => e.SearchSetId);
            });

            modelBuilder.Entity<BuildingType>(entity =>
            {
                entity.HasIndex(e => e.IsDeleted);
            });

            modelBuilder.Entity<Location>(entity =>
            {
                entity.HasIndex(e => e.IsDeleted);
            });

            modelBuilder.Entity<NewlySearchSetBgProperty>(entity =>
            {
                entity.HasIndex(e => e.BgPropertyId);

                entity.HasIndex(e => e.IsDeleted);

                entity.HasIndex(e => e.SearchSetId);

                entity.HasOne(d => d.BgProperty)
                    .WithMany(p => p.NewlySearchSetsBgProperties)
                    .HasForeignKey(d => d.BgPropertyId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.SearchSet)
                    .WithMany(p => p.NewlySearchSetsBgProperties)
                    .HasForeignKey(d => d.SearchSetId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<PropertyType>(entity =>
            {
                entity.HasIndex(e => e.IsDeleted);
            });

            modelBuilder.Entity<SearchCriteria>(entity =>
            {
                entity.HasIndex(e => e.IsDeleted);
            });

            modelBuilder.Entity<SearchCriteriaSearchSet>(entity =>
            {
                entity.HasIndex(e => e.IsDeleted);

                entity.HasIndex(e => e.SearchCriteriaId);

                entity.HasIndex(e => e.SearchSetId);

                entity.HasOne(d => d.SearchCriteria)
                    .WithMany(p => p.SearchCriteriasSearchSets)
                    .HasForeignKey(d => d.SearchCriteriaId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<SearchSet>(entity =>
            {
                entity.HasIndex(e => e.ApplicationUserId);

                entity.HasIndex(e => e.IsDeleted);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

        private static readonly MethodInfo SetIsDeletedQueryFilterMethod =
            typeof(ApplicationDbContext).GetMethod(
                nameof(SetIsDeletedQueryFilter),
                BindingFlags.NonPublic | BindingFlags.Static);

        private static void SetIsDeletedQueryFilter<T>(ModelBuilder builder)
            where T : class, IDeletableEntity
        {
            builder.Entity<T>().HasQueryFilter(e => !e.IsDeleted);
        }

        public override int SaveChanges() => this.SaveChanges(true);

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            this.ApplyAuditInfoRules();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default) =>
            this.SaveChangesAsync(true, cancellationToken);

        public override Task<int> SaveChangesAsync(
            bool acceptAllChangesOnSuccess,
            CancellationToken cancellationToken = default)
        {
            this.ApplyAuditInfoRules();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        private void ApplyAuditInfoRules()
        {
            var changedEntries = this.ChangeTracker
                .Entries()
                .Where(e =>
                    e.Entity is IAuditInfo &&
                    (e.State == EntityState.Added || e.State == EntityState.Modified));

            foreach (var entry in changedEntries)
            {
                var entity = (IAuditInfo)entry.Entity;
                if (entry.State == EntityState.Added && entity.CreatedOn == default)
                {
                    entity.CreatedOn = DateTime.UtcNow;
                }
                else
                {
                    entity.ModifiedOn = DateTime.UtcNow;
                }
            }
        }
    }
}
