using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BgPropertiesServer.Data.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AdditionalFeatures",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdditionalFeatures", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    UserName = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
                    Email = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Assets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BuildingTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BuildingTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Locations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    PopulatedPlace = table.Column<string>(nullable: false),
                    Region = table.Column<string>(nullable: true),
                    PlaceType = table.Column<string>(nullable: false),
                    District = table.Column<string>(nullable: true),
                    Street = table.Column<string>(nullable: true),
                    AdditionalInfo = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Locations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PropertyTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PropertyTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SearchCriterias",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SearchCriterias", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SearchSets",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    Name = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    ApplicationUserId = table.Column<string>(nullable: true),
                    IsInCheckingMode = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SearchSets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SearchSets_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BgProperties",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    AdvIdentity = table.Column<string>(nullable: false),
                    Url = table.Column<string>(nullable: false),
                    Area = table.Column<double>(nullable: true),
                    BuildingYear = table.Column<int>(nullable: true),
                    Floor = table.Column<int>(nullable: true),
                    TotalBuildingFloors = table.Column<int>(nullable: true),
                    CourtyardArea = table.Column<int>(nullable: true),
                    IsWithGas = table.Column<bool>(nullable: true),
                    IsWithCentalHeatingStation = table.Column<bool>(nullable: true),
                    PropertyTypeId = table.Column<int>(nullable: true),
                    BuildingTypeId = table.Column<int>(nullable: true),
                    LocationId = table.Column<int>(nullable: false),
                    Price = table.Column<int>(nullable: true),
                    PriceInEUR = table.Column<int>(nullable: true),
                    Currency = table.Column<string>(nullable: true),
                    Desctiption = table.Column<string>(nullable: true),
                    Action = table.Column<string>(nullable: false),
                    HasPicture = table.Column<bool>(nullable: false),
                    HasVideo = table.Column<bool>(nullable: false),
                    OfferVisited = table.Column<int>(nullable: false),
                    OfferPublishedOn = table.Column<DateTime>(nullable: true),
                    OfferChangedOn = table.Column<DateTime>(nullable: true),
                    IsTopOffer = table.Column<bool>(nullable: false),
                    IsNewOffer = table.Column<bool>(nullable: false),
                    IsTracked = table.Column<bool>(nullable: false),
                    PricePerSquareMeter = table.Column<double>(nullable: true),
                    PricePerSquareMeterInEUR = table.Column<double>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BgProperties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BgProperties_BuildingTypes_BuildingTypeId",
                        column: x => x.BuildingTypeId,
                        principalTable: "BuildingTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BgProperties_Locations_LocationId",
                        column: x => x.LocationId,
                        principalTable: "Locations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BgProperties_PropertyTypes_PropertyTypeId",
                        column: x => x.PropertyTypeId,
                        principalTable: "PropertyTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CriteriasCollection",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    SearchCriteriaId = table.Column<int>(nullable: false),
                    SearchSetId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SearchCriteriasSearchSets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SearchCriteriasSearchSets_SearchCriterias_SearchCriteriaId",
                        column: x => x.SearchCriteriaId,
                        principalTable: "SearchCriterias",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SearchCriteriasSearchSets_SearchSets_SearchSetId",
                        column: x => x.SearchSetId,
                        principalTable: "SearchSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AdditionalFeaturesBgProperties",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    AdditionalFeatureId = table.Column<int>(nullable: false),
                    BgPropertyId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdditionalFeaturesBgProperties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdditionalFeaturesBgProperties_AdditionalFeatures_AdditionalFeatureId",
                        column: x => x.AdditionalFeatureId,
                        principalTable: "AdditionalFeatures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AdditionalFeaturesBgProperties_BgProperties_BgPropertyId",
                        column: x => x.BgPropertyId,
                        principalTable: "BgProperties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TrackingUsers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    ApplicationUserId = table.Column<string>(nullable: true),
                    BgPropertyId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationUsersBgProperties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ApplicationUsersBgProperties_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ApplicationUsersBgProperties_BgProperties_BgPropertyId",
                        column: x => x.BgPropertyId,
                        principalTable: "BgProperties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AssetsBgProperties",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    BgPropertyId = table.Column<string>(nullable: true),
                    AssetId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetsBgProperties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AssetsBgProperties_Assets_AssetId",
                        column: x => x.AssetId,
                        principalTable: "Assets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AssetsBgProperties_BgProperties_BgPropertyId",
                        column: x => x.BgPropertyId,
                        principalTable: "BgProperties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SearchSets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    BgPropertyId = table.Column<string>(nullable: true),
                    SearchSetId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BgPropertiesSearchSets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BgPropertiesSearchSets_BgProperties_BgPropertyId",
                        column: x => x.BgPropertyId,
                        principalTable: "BgProperties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BgPropertiesSearchSets_SearchSets_SearchSetId",
                        column: x => x.SearchSetId,
                        principalTable: "SearchSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NewlySearchSetsBgProperties",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    BgPropertyId = table.Column<string>(nullable: false),
                    SearchSetId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NewlySearchSetsBgProperties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NewlySearchSetsBgProperties_BgProperties_BgPropertyId",
                        column: x => x.BgPropertyId,
                        principalTable: "BgProperties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_NewlySearchSetsBgProperties_SearchSets_SearchSetId",
                        column: x => x.SearchSetId,
                        principalTable: "SearchSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdditionalFeatures_IsDeleted",
                table: "AdditionalFeatures",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_AdditionalFeaturesBgProperties_AdditionalFeatureId",
                table: "AdditionalFeaturesBgProperties",
                column: "AdditionalFeatureId");

            migrationBuilder.CreateIndex(
                name: "IX_AdditionalFeaturesBgProperties_BgPropertyId",
                table: "AdditionalFeaturesBgProperties",
                column: "BgPropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_AdditionalFeaturesBgProperties_IsDeleted",
                table: "AdditionalFeaturesBgProperties",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationUsersBgProperties_ApplicationUserId",
                table: "TrackingUsers",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationUsersBgProperties_BgPropertyId",
                table: "TrackingUsers",
                column: "BgPropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationUsersBgProperties_IsDeleted",
                table: "TrackingUsers",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_IsDeleted",
                table: "AspNetUsers",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "([NormalizedUserName] IS NOT NULL)");

            migrationBuilder.CreateIndex(
                name: "IX_Assets_IsDeleted",
                table: "Assets",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_AssetsBgProperties_AssetId",
                table: "AssetsBgProperties",
                column: "AssetId");

            migrationBuilder.CreateIndex(
                name: "IX_AssetsBgProperties_BgPropertyId",
                table: "AssetsBgProperties",
                column: "BgPropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_AssetsBgProperties_IsDeleted",
                table: "AssetsBgProperties",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_BgProperties_BuildingTypeId",
                table: "BgProperties",
                column: "BuildingTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_BgProperties_IsDeleted",
                table: "BgProperties",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_BgProperties_LocationId",
                table: "BgProperties",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_BgProperties_PropertyTypeId",
                table: "BgProperties",
                column: "PropertyTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_BgPropertiesSearchSets_BgPropertyId",
                table: "SearchSets",
                column: "BgPropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_BgPropertiesSearchSets_IsDeleted",
                table: "SearchSets",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_BgPropertiesSearchSets_SearchSetId",
                table: "SearchSets",
                column: "SearchSetId");

            migrationBuilder.CreateIndex(
                name: "IX_BuildingTypes_IsDeleted",
                table: "BuildingTypes",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_Locations_IsDeleted",
                table: "Locations",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_NewlySearchSetsBgProperties_BgPropertyId",
                table: "NewlySearchSetsBgProperties",
                column: "BgPropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_NewlySearchSetsBgProperties_IsDeleted",
                table: "NewlySearchSetsBgProperties",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_NewlySearchSetsBgProperties_SearchSetId",
                table: "NewlySearchSetsBgProperties",
                column: "SearchSetId");

            migrationBuilder.CreateIndex(
                name: "IX_PropertyTypes_IsDeleted",
                table: "PropertyTypes",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_SearchCriterias_IsDeleted",
                table: "SearchCriterias",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_SearchCriteriasSearchSets_IsDeleted",
                table: "CriteriasCollection",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_SearchCriteriasSearchSets_SearchCriteriaId",
                table: "CriteriasCollection",
                column: "SearchCriteriaId");

            migrationBuilder.CreateIndex(
                name: "IX_SearchCriteriasSearchSets_SearchSetId",
                table: "CriteriasCollection",
                column: "SearchSetId");

            migrationBuilder.CreateIndex(
                name: "IX_SearchSets_ApplicationUserId",
                table: "SearchSets",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_SearchSets_IsDeleted",
                table: "SearchSets",
                column: "IsDeleted");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdditionalFeaturesBgProperties");

            migrationBuilder.DropTable(
                name: "TrackingUsers");

            migrationBuilder.DropTable(
                name: "AssetsBgProperties");

            migrationBuilder.DropTable(
                name: "SearchSets");

            migrationBuilder.DropTable(
                name: "NewlySearchSetsBgProperties");

            migrationBuilder.DropTable(
                name: "CriteriasCollection");

            migrationBuilder.DropTable(
                name: "AdditionalFeatures");

            migrationBuilder.DropTable(
                name: "Assets");

            migrationBuilder.DropTable(
                name: "BgProperties");

            migrationBuilder.DropTable(
                name: "SearchCriterias");

            migrationBuilder.DropTable(
                name: "SearchSets");

            migrationBuilder.DropTable(
                name: "BuildingTypes");

            migrationBuilder.DropTable(
                name: "Locations");

            migrationBuilder.DropTable(
                name: "PropertyTypes");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
