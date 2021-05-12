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
    public class PersonsController : ControllerBase
    {
        private IPersonRepository repo;

        public PersonsController(IPersonRepository repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        [Route("/api/Persons")]
        public IActionResult getPersons()
        {
            try
            {
                List<Person> persons = repo.GetAllPersons();
                return Ok(persons);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Route("/api/Persons/{Id}")]
        public IActionResult getPersonsById(int Id)
        {
            try
            {
                Person person = repo.GetPersonById(Id);
                return Ok(person);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("/api/Persons/Search")]
        public IActionResult getPersonsByIds([FromBody] List<int> personIds)
        {
            try
            {
                List<Person> list = repo.GetPersonsByIds(personIds);
                return Ok(list);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("/api/Persons")]
        public IActionResult createPerson([FromBody] Person person)
        {
            person = repo.CreateNewPerson(person);

            return Created(Url.RouteUrl(person.Id), person.Id);
        }

        [HttpPut]
        [Route("/api/Persons/{Id}")]
        public IActionResult updatePerson([FromBody] Person person, int id)
        {
            repo.UpdatePerson(id, person);

            return Ok(id);
        }

        [HttpDelete]
        [Route("/api/Persons/{Id}")]
        public IActionResult deletePerson(int Id)
        {
            try
            {
                repo.DeletePerson(Id);
                return Ok();

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}

