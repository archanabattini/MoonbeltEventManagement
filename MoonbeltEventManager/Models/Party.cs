using System;
using System.Collections.Generic;

#nullable disable

namespace MoonbeltEventManager.Models
{
    public partial class Party
    {
        public Party()
        {
            PersonParties = new HashSet<PersonParty>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Venue { get; set; }
        public DateTime? StartDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }

        public virtual ICollection<PersonParty> PersonParties { get; set; }
    }
}
