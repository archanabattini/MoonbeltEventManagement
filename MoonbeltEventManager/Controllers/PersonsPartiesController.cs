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
    public class PersonsPartiesController : ControllerBase
    {
        private IPersonPartyRepository repo;

        public PersonsPartiesController(IPersonPartyRepository repo)
        {
            this.repo = repo;
        }
        [HttpGet]
        [Route("/api/Relations/Persons/{Id}")]
        public IActionResult GetPersonParties(int Id)
        {
            try
            {
                List<int> partyIds = repo.GetPersonParties(Id);
                return Ok(partyIds);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Route("/api/Relations/Parties/{Id}")]
        public IActionResult GetPartyPersons(int Id)
        {
            try
            {
                List<int> personIds = repo.GetPartyPersons(Id);
                return Ok(personIds);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Route("/api/Relations/Parties/{PartyId}/Persons/{PersonId}")]
        public IActionResult GetDrinkForPersonParty(int PartyId, int PersonId)
        {
            try
            {
                PersonParty personPartyDrink = repo.GetDrinkForPersonParty(PersonId, PartyId);
                return Ok(personPartyDrink);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        [HttpPost]
        [Route("/api/Relations/Parties/{PartyId}/Persons")]
        public IActionResult GetDrinkForPartyPersons([FromBody] List<int> PersonIds, int PartyId)
        {
            try
            {
                List<PersonParty> partyPersonsDrinks = repo.GetDrinkForPartyPersons(PersonIds, PartyId);
                return Ok(partyPersonsDrinks);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("/api/Relations")]
        public IActionResult AddPartyToPerson([FromBody] PersonParty personParty)
        {
            repo.AddPartyToPerson(personParty.PersonId, personParty.PartyId, personParty.DrinkId);

            return Ok();
        }
        [HttpPut]
        [Route("/api/Relations")]
        public IActionResult ChangeDrinkForPersonParty([FromBody] PersonParty personParty)
        {
            repo.ChangeDrinkForPersonParty(personParty.PersonId, personParty.PartyId, personParty.DrinkId);

            return Ok();
        }
        [HttpDelete]
        [Route("/api/Relations/Parties/{PartyId}/Persons/{PersonId}")]
        public IActionResult DeletePartyFromPerson(int PartyId, int PersonId)
        {
            repo.DeletePartyFromPerson(PersonId, PartyId);

            return Ok();
        }
    }
}
