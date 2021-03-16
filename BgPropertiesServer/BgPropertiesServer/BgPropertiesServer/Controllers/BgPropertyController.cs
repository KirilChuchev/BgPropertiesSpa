using BgPropertiesServer.Data;
using BgPropertiesServer.Data.Models;
using BgPropertiesServer.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BgPropertiesServer.Controllers
{
    [Route("bg-properties/[action]")]
    [ApiController]
    public class BgPropertyController : ControllerBase
    {
        private readonly ApplicationDbContext db;
        private readonly IBgPropertiesService bgPropertiesService;

        public BgPropertyController(ApplicationDbContext db, IBgPropertiesService bgPropertiesService)
        {
            this.db = db;
            this.bgPropertiesService = bgPropertiesService;
        }

        // GET /BgProperty/5
        [HttpGet("{bgPropertyId}"), ActionName("one")]
        [HttpGet]
        [Route("{bgPropertyId}/{searchSetId}")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[Produces("application/json")]
        //[Produces("text/css")]
        public async Task<IActionResult> GetOne(string bgPropertyId, string searchSetId)
        {
            var entity = await this.bgPropertiesService.GetBgPropertyByIdAsync(bgPropertyId, searchSetId);

            if (entity == null)
            {
                return NotFound();
            }
            return Ok(entity);
        }

        // GET /BgProperty/onlyId/5
        [HttpGet("{id}"), ActionName("onlyId")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetOneOnlyById(string id)
        {
            var entity = await this.bgPropertiesService.GetBgPropertyOnlyByIdAsync(id);

            //if (entity == null)
            //{
            //    return NotFound();
            //}

            return Ok(entity);
        }

        // GET /BgProperty/get-all-by-searchSet/5
        [HttpGet("{searchSetId}"), ActionName("all")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[Produces("application/json")]
        //[Produces("text/css")]
        public async Task<IActionResult> GetAllBySearchSet(string searchSetId)
        {
            //var user = await this.db.AspNetUsers
            //    .FirstOrDefaultAsync(x => x.UserName == "kickz@abv.bg"
            //                              && x.PasswordHash == "AQAAAAEAACcQAAAAEGV6NZAUVI81kv5wu0Uc91l3+ssJ6Y5QjU2qK/F0+jwWDd6ynpuZRkRhtbdXgMu1oQ==");

            var user = await this.db.AspNetUsers.FirstOrDefaultAsync(x => x.Id == "kickz23b-5930-418e-90ad-03c749554101");

            var entities = await this.bgPropertiesService.GetAllBgPropertiesBySearchSetAsync(user.Id, searchSetId);

            return Ok(entities);
        }

        // POST api/<BgProperty>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<BgProperty>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<BgProperty>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
