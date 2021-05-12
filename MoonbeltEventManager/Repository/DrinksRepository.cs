using MoonbeltEventManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.EntityFrameworkCore;

namespace MoonbeltEventManager.Repository
{
    public class DrinksRepository : IDrinksRepository
    {
        private MoonbeltContext db;

        public DrinksRepository(MoonbeltContext db)
        {
            this.db = db;
        }
        public bool CheckDrinkExists(int DrinkId)
        {
            bool exists = db.Drinks.Where(x => x.Id == DrinkId).Any();
            return exists;
        }

        public void DeleteDrink(int drinkId)
        {
            Drink d = GetDrinkById(drinkId);

            if (d != null)
            {
                db.Drinks.Remove(d);
                db.SaveChanges();
            }
        }

        public List<Drink> GetAllDrinks()
        {
            return db.Drinks.ToList();
        }

        public Drink GetDrinkById(int drinkId)
        {
            return db.Drinks.Where(x => x.Id == drinkId).FirstOrDefault();
        }
        public List<Drink> GetDrinksByIds(List<int> drinkIds)
        {
            return db.Drinks.Where(x => drinkIds.Contains(x.Id)).ToList();
        }

        public void UpdateDrink(int drinkId, Drink drink)
        {
            Drink d = db.Drinks.Where(x => x.Id == drinkId).FirstOrDefault();

            if (d != null)
            {
                d.Name = drink.Name;
                db.SaveChanges();
            }
        }

        Drink IDrinksRepository.AddDrink(Drink drink)
        {
            Drink d = new Drink();
            d.Name = drink.Name;
            if(db.Drinks.Count() != 0)
            {
                d.Id = db.Drinks.Max(x => x.Id) + 1;
            }
            else
            {
                d.Id = 1;
            }
            d = db.Drinks.Add(d).Entity;
            db.SaveChanges();
            return d;
        }
    }
}