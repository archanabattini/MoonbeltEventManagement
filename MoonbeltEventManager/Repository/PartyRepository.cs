using MoonbeltEventManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MoonbeltEventManager.Repository
{
    public class PartyRepository : IPartyRepository
    {
        private MoonbeltContext db;
        private IPersonPartyRepository repo;

        public PartyRepository(MoonbeltContext db, IPersonPartyRepository repo)
        {
            this.db = db;
            this.repo = repo;
        }
        public void DeleteParty(int partyId)
        {
            repo.DeletePartyFromPersonParty(partyId);
            Party p = db.Parties.Where(x => x.Id == partyId).FirstOrDefault();

            if (p != null)
            {
                db.Parties.Remove(p);
                db.SaveChanges();
            }
        }

        public List<Party> GetAllParties()
        {
            return db.Parties.ToList();
        }
        public Party CreateNewParty(Party party)
        {
            Party p = new Party();
            p.Name = party.Name;
            p.Venue = party.Venue;
            p.StartDateTime = party.StartDateTime;
            p.EndDateTime = party.EndDateTime;

            if (db.Parties.Count() != 0)
            {
                p.Id = db.Parties.Max(x => x.Id) + 1;
            }
            else
            {
                p.Id = 1;
            }
            p = db.Parties.Add(p).Entity;
            db.SaveChanges();
            return p;
        }

        public Party GetPartyById(int partyId)
        {
            return db.Parties.Where(x => x.Id == partyId).FirstOrDefault();
        }

        public List<Party> GetPartiesByIds(List<int> partyIds)
        {
            return db.Parties.Where(x => partyIds.Contains(x.Id)).ToList();
        }

        public void UpdateParty(int partyId, Party party)
        {
            Party p = db.Parties.Where(x => x.Id == partyId).FirstOrDefault();

            if (p != null)
            {
                p.Name = party.Name;
                p.Venue = party.Venue;
                p.StartDateTime = party.StartDateTime;
                p.EndDateTime = party.EndDateTime;
                db.SaveChanges();
            }
        }
        public bool CheckPartyExists(int partyId)
        {
            bool exists = db.Parties.Where(x => x.Id == partyId).Any();
            return exists;
        }

        public List<PersonParty> GetPartyPersons(int partyId)
        {
            List<PersonParty> partyperson = new List<PersonParty>();
            if (CheckPartyExists(partyId))
            {
                partyperson = db.PersonParties.Where(x => x.PartyId == partyId).ToList();
            }
            return partyperson;
        }
    }
}