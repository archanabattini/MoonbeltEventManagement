using System;
using System.Collections.Generic;

#nullable disable

namespace MoonbeltEventManager.Models
{
    public partial class Person
    {
        public Person()
        {
            PersonParties = new HashSet<PersonParty>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }

        public virtual ICollection<PersonParty> PersonParties { get; set; }
    }
}
