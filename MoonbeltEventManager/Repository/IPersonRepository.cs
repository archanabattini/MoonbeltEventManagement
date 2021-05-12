using MoonbeltEventManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoonbeltEventManager.Repository
{
    public interface IPersonRepository
    {
        List<Person> GetAllPersons();
        Person CreateNewPerson(Person person);
        Person GetPersonById(int personId);
        void UpdatePerson(int personId, Person person);
        void DeletePerson(int personId);
        bool CheckPersonExists(int personId);
        List<Person> GetPersonsByIds(List<int> personIds);
    }
}
