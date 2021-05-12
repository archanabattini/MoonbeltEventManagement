using MoonbeltEventManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoonbeltEventManager.Repository
{
    public interface IPersonPartyRepository
    {
        List<int> GetPartyPersons(int partyId);
        void AddPartyToPerson(int personId, int partyId, int? drinkId);
        void DeletePartyFromPerson(int personId, int partyId);
        void ChangeDrinkForPersonParty(int personId, int partyId, int? drinkId);
        List<int> GetPersonParties(int personId);
        PersonParty GetDrinkForPersonParty(int personId, int partyId);

    }
}
