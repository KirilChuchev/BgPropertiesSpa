using BgPropertiesServer.Data;
using BgPropertiesServer.Data.Models;
using BgPropertiesServer.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;


namespace BgPropertiesServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : Controller
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly ApplicationDbContext db;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, ApplicationDbContext db)
        {
            _logger = logger;
            this.db = db;
        }

        [HttpGet]
        //public IEnumerable<WeatherForecast> Get()
        public IEnumerable<BgProperty> Get()
        {
            //var rng = new Random();
            //return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            //{
            //    Date = DateTime.Now.AddDays(index),
            //    TemperatureC = rng.Next(-20, 55),
            //    Summary = Summaries[rng.Next(Summaries.Length)]
            //})
            //.ToArray();

            return this.db.BgProperties.Where(x => x.BuildingYear == 2000).ToArray();
        }

        [HttpGet("{id}")]
        public IEnumerable<BgProperty> Get(string id)
        //public IEnumerable<BgProperties> GetById(string id)
        //public HttpResponseMessage GetById(string id)
        {
            var entity = this.db.BgProperties.FirstOrDefault(x => x.Id == id);
            var a = new List<BgProperty>();
            a.Add(entity);
            return a;
            //if (entity == null)
            //{
            //    throw new HttpResponseException(HttpStatusCode.NotFound);
            //}

            //return Request.CreateResponse(HttpStatusCode.OK, entity);
        }

        //[HttpPost]
        //public async Task<ActionResult<BgPropertyDetailsViewModel>> GetBgPropertyByIdPost([FromForm] BgPropertyApiInputViewModel inputModel)
        //{
        //    var currentUser = await this.userManager.GetUserAsync(this.User);
        //    var outputModel = await this.bgPropertiesService.GetBgPropertyByIdAsync(inputModel.Id, null, currentUser.Id);

        //    return outputModel == null ? this.NotFound() : outputModel.BgProperty;
        //}

        [HttpPost]
        public string Post([FromBody] BgPropertyInputModel req)
        {
            var location = new Location()
            {
                CreatedOn = DateTime.UtcNow,
                PlaceType = req.PlaceType,
                PopulatedPlace = req.PopulatedPlace,
            };

            var locationEntity = this.db.Locations.Add(location);
            this.db.SaveChanges();


            var newEntity = new BgProperty()
            {
                CreatedOn = DateTime.UtcNow,
                AdvIdentity = AdvIdentityGenerator.Generate(db),
                Url = "",
                Area = req.Area,
                BuildingYear = req.BuildingYear,
                Action = "Продава",
                Currency = "EUR",
                Desctiption = req.Description,
                LocationId = locationEntity.Entity.Id,
            };

            this.db.BgProperties.Add(newEntity);
            this.db.SaveChanges();

            //return newEntity.Id;
            //return dbEntity.Entity.Id;
            return "ok";



            //public int? Floor { get; set; }
            //public int? TotalBuildingFloors { get; set; }
            //public int? CourtyardArea { get; set; }
            //public bool? IsWithGas { get; set; }
            //public bool? IsWithCentalHeatingStation { get; set; }
            //public int? PropertyTypeId { get; set; }
            //public int? BuildingTypeId { get; set; }
            //public int LocationId { get; set; }
            //public int? Price { get; set; }
            //public string Currency { get; set; }
            //[Required]
            //public string Action { get; set; }
            //public bool HasPicture { get; set; }
            //public bool HasVideo { get; set; }
            //public int OfferVisited { get; set; }
            //public DateTime? OfferPublishedOn { get; set; }
            //public DateTime? OfferChangedOn { get; set; }
            //public bool IsTopOffer { get; set; }
            //public bool IsNewOffer { get; set; }
            //public bool IsTracked { get; set; }
            //public double? PricePerSquareMeter { get; set; }
            //[Column("PriceInEUR")]
            //public int? PriceInEur { get; set; }
            //[Column("PricePerSquareMeterInEUR")]
            //public double? PricePerSquareMeterInEur { get; set; }

            //[ForeignKey(nameof(BuildingTypeId))]
            //[InverseProperty(nameof(BuildingTypes.BgProperties))]
            //public virtual BuildingTypes BuildingType { get; set; }
            //[ForeignKey(nameof(LocationId))]
            //[InverseProperty(nameof(Locations.BgProperties))]
            //public virtual Locations Location { get; set; }
            //[ForeignKey(nameof(PropertyTypeId))]
            //[InverseProperty(nameof(PropertyTypes.BgProperties))]
            //public virtual PropertyTypes PropertyType { get; set; }
            //[InverseProperty("BgPropertyId1Navigation")]
            //public virtual ICollection<AdditionalFeaturesBgProperties> AdditionalFeaturesBgProperties { get; set; }
            //[InverseProperty("BgProperty")]
            //public virtual ICollection<ApplicationUsersBgProperties> ApplicationUsersBgProperties { get; set; }
            //[InverseProperty("BgPropertyId1Navigation")]
            //public virtual ICollection<AssetsBgProperties> AssetsBgProperties { get; set; }
            //[InverseProperty("BgProperty")]
            //public virtual ICollection<BgPropertiesSearchSets> BgPropertiesSearchSets { get; set; }
            //[InverseProperty("BgProperty")]
            //public virtual ICollection<NewlySearchSetsBgProperties> NewlySearchSetsBgProperties { get; set; }
        }

        [HttpDelete("{id}")]
        public string Delete(string id)
        {
            var entity = this.db.BgProperties.FirstOrDefault(x => x.Id == id);
            var removedEntity = this.db.BgProperties.Remove(entity);
            this.db.SaveChanges();
            return removedEntity.Entity.Id;
        }
    }

    public class BgPropertyInputModel
    {
        public double Area { get; set; }
        public int? BuildingYear { get; set; }

        public string Description { get; set; }

        public string PopulatedPlace { get; set; }

        public string PlaceType { get; set; }
    }


}
