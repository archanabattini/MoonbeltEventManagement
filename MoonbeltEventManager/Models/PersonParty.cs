using System;
using System.Collections.Generic;

#nullable disable

namespace MoonbeltEventManager.Models
{
    public partial class PersonParty
    {
        public int PersonId { get; set; }
        public int PartyId { get; set; }
        public int? DrinkId { get; set; }

        public virtual Drink Drink { get; set; }
        public virtual Party Party { get; set; }
        public virtual Person Person { get; set; }
    }
}
