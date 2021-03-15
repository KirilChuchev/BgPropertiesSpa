﻿// <auto-generated />
using System;
using BgPropertiesServer.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BgPropertiesServer.Data.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20210311110531_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.12")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("BgPropertiesServer.Data.Models.AdditionalFeatures", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("ModifiedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("IsDeleted");

                    b.ToTable("AdditionalFeatures");
                });

            modelBuilder.Entity("BgPropertiesServer.Data.Models.AdditionalFeaturesBgProperties", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AdditionalFeatureId")
                        .HasColumnType("int");

                    b.Property<string>("BgPropertyId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("ModifiedOn")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("AdditionalFeatureId");

                    b.HasIndex("BgPropertyId");

                    b.HasIndex("IsDeleted");

                    b.ToTable("AdditionalFeaturesBgProperties");
                });

            modelBuilder.Entity("BgPropertiesServer.Data.Models.TrackingUsers", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ApplicationUserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("BgPropertyId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("ModifiedOn")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("ApplicationUserId");

                    b.HasIndex("BgPropertyId");

                    b.HasIndex("IsDeleted");

                    b.ToTable("TrackingUsers");
                });

            modelBuilder.Entity("BgPropertiesServer.Data.Models.AspNetUsers", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<DateTime?>("ModifiedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("IsDeleted");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("([NormalizedUserName] IS NOT NULL)");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("BgPropertiesServer.Data.Models.Assets", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("ModifiedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("IsDeleted");

                    b.ToTable("Assets");
                });

            modelBuilder.Entity("BgPropertiesServer.Data.Models.AssetsBgProperties", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AssetId")
                        .HasColumnType("int");

                    b.Property<string>("BgPropertyId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("ModifiedOn")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("AssetId");

                    b.HasIndex("BgPropertyId");

                    b.HasIndex("IsDeleted");

                    b.ToTable("AssetsBgProperties");
                });

            modelBuilder.Entity("BgPropertiesServer.Data.Models.BgProperties", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Action")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AdvIdentity")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double?>("Area")
                        .HasColumnType("float");

                    b.Property<int?>("BuildingTypeId")
                        .HasColumnType("int");

                    b.Property<int?>("BuildingYear")
                        .HasColumnType("int");

                    b.Property<int?>("CourtyardArea")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Currency")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Desctiption")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Floor")
                        .HasColumnType("int");

                    b.Property<bool>("HasPicture")
                        .HasColumnType("bit");

                    b.Property<bool>("HasVideo")
                        .HasColumnType("bit");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<bool>("IsNewOffer")
                        .HasColumnType("bit");

                    b.Property<bool>("IsTopOffer")
                        .HasColumnType("bit");

                    b.Property<bool>("IsTracked")
                        .HasColumnType("bit");

                    b.Property<bool?>("IsWithCentalHeatingStation")
                        .HasColumnType("bit");

                    b.Property<bool?>("IsWithGas")
                        .HasColumnType("bit");

                    b.Property<int>("LocationId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("ModifiedOn")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("OfferChangedOn")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("OfferPublishedOn")
                        .HasColumnType("datetime2");

                    b.Property<int>("OfferVisited")
                        .HasColumnType("int");

                    b.Property<int?>("Price")
                        .HasColumnType("int");

                    b.Property<int?>("PriceInEUR")
                        .HasColumnName("PriceInEUR")
                        .HasColumnType("int");

                    b.Property<double?>("PricePerSquareMeter")
                        .HasColumnType("float");

                    b.Property<double?>("PricePerSquareMeterInEUR")
                        .HasColumnName("PricePerSquareMeterInEUR")
                        .HasColumnType("float");

                    b.Property<int?>("PropertyTypeId")
                        .HasColumnType("int");

                    b.Property<int?>("TotalBuildingFloors")
                        .HasColumnType("int");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("BuildingTypeId");

                    b.HasIndex("IsDeleted");

                    b.HasIndex("LocationId");

                    b.HasIndex("PropertyTypeId");

                    b.ToTable("BgProperties");
                });

            modelBuilder.Entity("BgPropertiesServer.Data.Models.SearchSets", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("BgPropertyId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("ModifiedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("SearchSetId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("BgPropertyId");

                    b.HasIndex("IsDeleted");

                    b.HasIndex("SearchSetId");

                    b.ToTable("SearchSets");
                });

            modelBuilder.Entity("BgPropertiesServer.Data.Models.BuildingTypes", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("ModifiedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("IsDeleted");

                    b.ToTable("BuildingTypes");
                });

            modelBuilder.Entity("BgPropertiesServer.Data.Models.Locations", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AdditionalInfo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("District")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("ModifiedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("PlaceType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PopulatedPlace")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Region")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Street")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("IsDeleted");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("BgPropertiesServer.Data.Models.NewlySearchSetsBgProperties", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("BgPropertyId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("ModifiedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("SearchSetId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("BgPropertyId");

                    b.HasIndex("IsDeleted");

                    b.HasIndex("SearchSetId");

                    b.ToTable("NewlySearchSetsBgProperties");
                });

            modelBuilder.Entity("BgPropertiesServer.Data.Models.PropertyTypes", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("ModifiedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("IsDeleted");

                    b.ToTable("PropertyTypes");
                });

            modelBuilder.Entity("BgPropertiesServer.Data.Models.SearchCriterias", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("ModifiedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("IsDeleted");

                    b.ToTable("SearchCriterias");
                });

            modelBuilder.Entity("BgPropertiesServer.Data.Models.CriteriasCollection", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("ModifiedOn")
                        .HasColumnType("datetime2");

                    b.Property<int>("SearchCriteriaId")
                        .HasColumnType("int");

                    b.Property<string>("SearchSetId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("IsDeleted");

                    b.HasIndex("SearchCriteriaId");

                    b.HasIndex("SearchSetId");

                    b.ToTable("CriteriasCollection");
                });

            modelBuilder.Entity("BgPropertiesServer.Data.Models.SearchSets", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ApplicationUserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<bool>("IsInCheckingMode")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("ModifiedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ApplicationUserId");

                    b.HasIndex("IsDeleted");

                    b.ToTable("SearchSets");
                });

            modelBuilder.Entity("BgPropertiesServer.Data.Models.AdditionalFeaturesBgProperties", b =>
                {
                    b.HasOne("BgPropertiesServer.Data.Models.AdditionalFeatures", "AdditionalFeature")
                        .WithMany("AdditionalFeaturesBgProperties")
                        .HasForeignKey("AdditionalFeatureId")
                        .IsRequired();

                    b.HasOne("BgPropertiesServer.Data.Models.BgProperties", "BgProperty")
                        .WithMany("AdditionalFeaturesBgProperties")
                        .HasForeignKey("BgPropertyId");
                });

            modelBuilder.Entity("BgPropertiesServer.Data.Models.TrackingUsers", b =>
                {
                    b.HasOne("BgPropertiesServer.Data.Models.AspNetUsers", "ApplicationUser")
                        .WithMany("TrackingUsers")
                        .HasForeignKey("ApplicationUserId");

                    b.HasOne("BgPropertiesServer.Data.Models.BgProperties", "BgProperty")
                        .WithMany("TrackingUsers")
                        .HasForeignKey("BgPropertyId");
                });

            modelBuilder.Entity("BgPropertiesServer.Data.Models.AssetsBgProperties", b =>
                {
                    b.HasOne("BgPropertiesServer.Data.Models.Assets", "Asset")
                        .WithMany("AssetsBgProperties")
                        .HasForeignKey("AssetId")
                        .IsRequired();

                    b.HasOne("BgPropertiesServer.Data.Models.BgProperties", "BgProperty")
                        .WithMany("AssetsBgProperties")
                        .HasForeignKey("BgPropertyId");
                });

            modelBuilder.Entity("BgPropertiesServer.Data.Models.BgProperties", b =>
                {
                    b.HasOne("BgPropertiesServer.Data.Models.BuildingTypes", "BuildingType")
                        .WithMany("BgProperties")
                        .HasForeignKey("BuildingTypeId");

                    b.HasOne("BgPropertiesServer.Data.Models.Locations", "Location")
                        .WithMany("BgProperties")
                        .HasForeignKey("LocationId")
                        .IsRequired();

                    b.HasOne("BgPropertiesServer.Data.Models.PropertyTypes", "PropertyType")
                        .WithMany("BgProperties")
                        .HasForeignKey("PropertyTypeId");
                });

            modelBuilder.Entity("BgPropertiesServer.Data.Models.SearchSets", b =>
                {
                    b.HasOne("BgPropertiesServer.Data.Models.BgProperties", "BgProperty")
                        .WithMany("SearchSets")
                        .HasForeignKey("BgPropertyId");

                    b.HasOne("BgPropertiesServer.Data.Models.SearchSets", "SearchSet")
                        .WithMany("SearchSets")
                        .HasForeignKey("SearchSetId");
                });

            modelBuilder.Entity("BgPropertiesServer.Data.Models.NewlySearchSetsBgProperties", b =>
                {
                    b.HasOne("BgPropertiesServer.Data.Models.BgProperties", "BgProperty")
                        .WithMany("NewlySearchSetsBgProperties")
                        .HasForeignKey("BgPropertyId")
                        .IsRequired();

                    b.HasOne("BgPropertiesServer.Data.Models.SearchSets", "SearchSet")
                        .WithMany("NewlySearchSetsBgProperties")
                        .HasForeignKey("SearchSetId")
                        .IsRequired();
                });

            modelBuilder.Entity("BgPropertiesServer.Data.Models.CriteriasCollection", b =>
                {
                    b.HasOne("BgPropertiesServer.Data.Models.SearchCriterias", "SearchCriteria")
                        .WithMany("CriteriasCollection")
                        .HasForeignKey("SearchCriteriaId")
                        .IsRequired();

                    b.HasOne("BgPropertiesServer.Data.Models.SearchSets", "SearchSet")
                        .WithMany("CriteriasCollection")
                        .HasForeignKey("SearchSetId");
                });

            modelBuilder.Entity("BgPropertiesServer.Data.Models.SearchSets", b =>
                {
                    b.HasOne("BgPropertiesServer.Data.Models.AspNetUsers", "ApplicationUser")
                        .WithMany("SearchSets")
                        .HasForeignKey("ApplicationUserId");
                });
#pragma warning restore 612, 618
        }
    }
}
