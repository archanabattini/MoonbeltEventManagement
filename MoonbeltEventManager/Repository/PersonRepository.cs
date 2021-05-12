using MoonbeltEventManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MoonbeltEventManager.Repository
{
    public class PersonRepository : IPersonRepository
    {
        private MoonbeltContext db;
        private IPersonPartyRepository repo;

        public PersonRepository(MoonbeltContext db, IPersonPartyRepository repo)
        {
            this.db = db;
            this.repo = repo;
        }
        public bool CheckPersonExists(int personId)
        {
            bool exists = db.Persons.Where(x => x.Id == personId).Any();
            return exists;
        }

        public Person CreateNewPerson(Person person)
        {
            Person p = new Person();

            p.FirstName = person.FirstName;
            p.LastName = person.LastName;
            p.Email = person.Email;
            p.PhoneNumber = person.PhoneNumber;
            if (db.Persons.Count() != 0)
            {
                p.Id = db.Persons.Max(x => x.Id) + 1;
            }
            else
            {
                p.Id = 1;
            }
            p = db.Persons.Add(p).Entity;
            db.SaveChanges();
            return p;
        }
        public Person GetPersonById(int personId)
        {
            return db.Persons.Where(x => x.Id == personId).FirstOrDefault();
        }
        public List<Person> GetPersonsByIds(List<int> personIds)
        {
            return db.Persons.Where(x => personIds.Contains(x.Id)).ToList();
        }
        public void DeletePerson(int personId)
        {
            repo.DeletePersonFromPersonParty(personId);
            Person p = db.Persons.Where(x => x.Id == personId).FirstOrDefault();

            if(p != null)
            {
                db.Persons.Remove(p);
                db.SaveChanges();
            }
        }
        public List<Person> GetAllPersons()
        {
            return  db.Persons.ToList();
        }
        public void UpdatePerson(int personId, Person person)
        {
            Person p = db.Persons.Where(x => x.Id == personId).FirstOrDefault();

            if (p != null)
            {
                p.FirstName = person.FirstName;
                p.LastName = person.LastName;
                p.Email = person.Email;
                p.PhoneNumber = person.PhoneNumber;
                db.SaveChanges();
            }
        }
    }
}