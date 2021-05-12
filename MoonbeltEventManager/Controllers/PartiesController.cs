using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MoonbeltEventManager.Models;
using MoonbeltEventManager.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoonbeltEventManager.Controllers
{
    [ApiController]
    public class PartiesController : ControllerBase
    {
        private IPartyRepository repo;

        public PartiesController(IPartyRepository repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        [Route("/api/Parties")]
        public IActionResult getParties()
        {
            try
            {
                List<Party> parties = repo.GetAllParties();
                return Ok(parties);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("/api/Parties/{Id}")]
        public IActionResult getPartiesById(int Id)
        {
            try
            {
                Party party = repo.GetPartyById(Id);
                return Ok(party);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("/api/Parties/Search")]
        public IActionResult getPartiesByIds([FromBody] List<int> Ids)
        {
            try
            {
                List<Party> party = repo.GetPartiesByIds(Ids);
                return Ok(party);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("/api/Parties")]
        public IActionResult createParty([FromBody] Party party)
        {
            party = repo.CreateNewParty(party);

            return Created(Url.RouteUrl(party.Id), party.Id);
        }

        [HttpPut]
        [Route("/api/Parties/{Id}")]
        public IActionResult updateParty([FromBody] Party party, int id)
        {
            repo.UpdateParty(id, party);

            return Ok(id);
        }

        [HttpDelete]
        [Route("/api/Parties/{Id}")]
        public IActionResult deleteParty(int Id)
        {
            try
            {
                repo.DeleteParty(Id);
                return Ok();

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}

