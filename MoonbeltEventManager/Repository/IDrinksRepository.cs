using MoonbeltEventManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoonbeltEventManager.Repository
{
    public interface IDrinksRepository
    {
        List<Drink> GetAllDrinks();
        Drink GetDrinkById(int DrinkId);
        void UpdateDrink(int DrinkId, Drink drink);
        void DeleteDrink(int DrinkId);
        bool CheckDrinkExists(int DrinkId);
        Drink AddDrink(Drink drink);
    }
}
