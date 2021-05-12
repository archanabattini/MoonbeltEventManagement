using MoonbeltEventManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoonbeltEventManager.Repository
{
    public interface IPartyRepository
    {
        List<Party> GetAllParties();
        Party CreateNewParty(Party party);
        Party GetPartyById(int partyId);
        void UpdateParty(int partyId, Party party);
        void DeleteParty(int partyId);
        bool CheckPartyExists(int partyId);
        List<PersonParty> GetPartyPersons(int partyId);
        List<Party> GetPartiesByIds(List<int> partyIds);
    }
}
