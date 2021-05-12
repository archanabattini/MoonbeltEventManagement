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
    public class DrinksController : ControllerBase
    {
        private IDrinksRepository repo;

        public DrinksController(IDrinksRepository repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        [Route("/api/Drinks")]
        public IActionResult getDrinks()
        {
            try
            {
                List<Drink> drinks = repo.GetAllDrinks();
                return Ok(drinks);

            } catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("/api/Drinks/{Id}")]
        public IActionResult getDrinksById(int Id)
        {
            try
            {
                Drink drink = repo.GetDrinkById(Id);
                return Ok(drink);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        [HttpPost]
        [Route("/api/Drinks/Search")]
        public IActionResult getDrinksByIds([FromBody] List<int> Ids)
        {
            try
            {
                List<Drink> drinks = repo.GetDrinksByIds(Ids);
                return Ok(drinks);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("/api/Drinks")]
        public IActionResult createDrink([FromBody] Drink drink)
        {
            drink = repo.AddDrink(drink);

            return Created(Url.RouteUrl(drink.Id), drink.Id);
        }

        [HttpPut]
        [Route("/api/Drinks/{Id}")]
        public IActionResult updateDrink([FromBody] Drink drink, int id)
        {
            repo.UpdateDrink(id, drink);

            return Ok(id);
        }

        [HttpDelete]
        [Route("/api/Drinks/{Id}")]
        public IActionResult deleteDrinks(int Id)
        {
            try
            {
                 repo.DeleteDrink(Id);
                return Ok();

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
