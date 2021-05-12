using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace MoonbeltEventManager.Models
{
    public partial class Drink
    {
        public Drink()
        {
            PersonParties = new HashSet<PersonParty>();
        }
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<PersonParty> PersonParties { get; set; }
    }
}
