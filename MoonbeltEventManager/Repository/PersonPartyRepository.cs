using MoonbeltEventManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MoonbeltEventManager.Repository
{
    public class PersonPartyRepository : IPersonPartyRepository
    {
        private MoonbeltContext db;

        public PersonPartyRepository(MoonbeltContext db)
        {
            this.db = db;
        }

        public List<int> GetPersonParties(int personId)
        {
            List<int> personparty = new List<int>();
            if (CheckPersonExists(personId))
            {
                personparty = db.PersonParties.Where(x => x.PersonId == personId).Select(x => x.PartyId).ToList();
            }
            return personparty;
        }
        public List<int> GetPartyPersons(int partyId)
        {
            List<int> partyperson = new List<int>();
            if (CheckPartyExists(partyId))
            {
                partyperson = db.PersonParties.Where(x => x.PartyId == partyId).Select(x => x.PersonId).ToList();
            }
            return partyperson;
        }
        public void AddPartyToPerson(int personId, int partyId, int? drinkId)
        {
            PersonParty personparty = new PersonParty();
            personparty.PersonId = personId;
            personparty.PartyId = partyId;
            personparty.DrinkId = drinkId;
            db.PersonParties.Add(personparty);
            db.SaveChanges();
        }
        public void DeletePartyFromPerson(int personId, int partyId)
        {
            if (CheckPartyExists(partyId) && CheckPersonExists(personId) && (GetDrinkForPersonParty(personId, partyId) != null))
            {
                PersonParty personparty = db.PersonParties.Where(x => x.PersonId == personId && x.PartyId == partyId).FirstOrDefault();
                db.PersonParties.Remove(personparty);
                db.SaveChanges();
            }
        }
        public void ChangeDrinkForPersonParty(int personId, int partyId, int? drinkId)
        {
            if (CheckPartyExists(partyId) && CheckPersonExists(personId) && (GetDrinkForPersonParty(personId,partyId) != null))
            {
                PersonParty personparty = db.PersonParties.Where(x => x.PersonId == personId && x.PartyId == partyId).FirstOrDefault();
                personparty.DrinkId = drinkId;
                db.SaveChanges();
            }
        }

        public PersonParty GetDrinkForPersonParty(int personId, int partyId)
        {
            if (CheckPartyExists(partyId) && CheckPersonExists(personId))
            {
                PersonParty personparty = db.PersonParties.Where(x => x.PersonId == personId && x.PartyId == partyId).FirstOrDefault();
                return personparty;
            } else
            {
                return null;
            }
        }
        public bool CheckPartyExists(int partyId)
        {
            bool exists = db.Parties.Where(x => x.Id == partyId).Any();
            return exists;
        }
        public bool CheckPersonExists(int personId)
        {
            bool exists = db.Persons.Where(x => x.Id == personId).Any();
            return exists;
        }

    }
}