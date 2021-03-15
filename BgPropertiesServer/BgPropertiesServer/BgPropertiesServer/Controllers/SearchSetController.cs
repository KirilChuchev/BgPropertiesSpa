using BgPropertiesServer.Data;
using BgPropertiesServer.Data.Models;
using BgPropertiesServer.Services;
using BgPropertiesServer.ViewModels.SearchSet;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BgPropertiesServer.Controllers
{

    [Route("[controller]/[action]")]
    //[Route("[controller]")]
    [ApiController]
    public class SearchSetController : ControllerBase
    {
        private readonly ApplicationDbContext db;
        private readonly ISearchSetService searchSetService;

        public SearchSetController(ApplicationDbContext db, ISearchSetService searchSetService)
        {
            this.db = db;
            this.searchSetService = searchSetService;
        }


        // GET: api/<SearchSetController>
        [HttpGet("{searchSetId}"), ActionName("one")]
        //[Route("[controller]/{searchSetId}")]
        //[Route("/{searchSetId}")]
        public async Task<IActionResult> GetOneById(string searchSetId)
        {
            var user = await this.db.AspNetUsers.FirstOrDefaultAsync(x => x.Id == "kickz23b-5930-418e-90ad-03c749554101");
            var entity = await this.searchSetService.GetOneAsViewModel(user, searchSetId);

            return Ok(entity);
            //return new string[] { "value1", "value2" };

        }

        // GET api/<SearchSetController>/5
        //[HttpGet("{id}")]
        [HttpGet]
        public string Get(int id)
        {
            return "value";
        }

        // GET api/<SearchSetController>/5
        //[HttpGet("/all/{userId}")]
        [HttpGet("{userId}"), ActionName("all")]

        public async Task<IActionResult> GetAllByUserId(string userId)
        {
            var user = await this.db.AspNetUsers.FirstOrDefaultAsync(x => x.Id == userId);

            var entities = await this.searchSetService.GetAllAsViewModel(user);

            return Ok(entities);
        }

        // POST <SearchSetController>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SearchSetInputViewModel model)
        {
            //try
            //{

            //}
            //catch (Exception е)
            //{
            //    return е;
            //}

            //var user = await this.db.AspNetUsers
            //    .FirstOrDefaultAsync(x => x.UserName == "kickz@abv.bg"
            //                              && x.PasswordHash == "AQAAAAEAACcQAAAAEGV6NZAUVI81kv5wu0Uc91l3+ssJ6Y5QjU2qK/F0+jwWDd6ynpuZRkRhtbdXgMu1oQ==");

            var user = await this.db.AspNetUsers.FirstOrDefaultAsync(x => x.Id == "kickz23b-5930-418e-90ad-03c749554101");

            var createdSearchSetId = await this.searchSetService.CreateAsync(model, user);


            Response.StatusCode = StatusCodes.Status201Created;
            return new JsonResult(createdSearchSetId);

        }

        //// PUT api/<SearchSetController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<SearchSetController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
