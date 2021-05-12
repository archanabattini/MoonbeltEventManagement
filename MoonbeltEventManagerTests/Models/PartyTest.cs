using MoonbeltEventManager.Models;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoonbeltEventManagerTests.Models
{
    [TestFixture]
    public class PartyTest
    {
        Party party;

        [SetUp]
        public void setup()
        {
            party = new Party();
        }

        [Test]
        public void PartyIdGetSet_Test() // test for get and set
        {
            party.Id = 1;

            Assert.AreEqual(1, party.Id);
        }
        [Test]
        public void PartyNameGetSet_Test()
        {
            party.Name = "CityLights";

            Assert.AreEqual("CityLights", party.Name);

            party.Name = null;
            Assert.IsNull(party.Name);
        }

        [Test]
        public void PartyVenueGetSet_Test()
        {
            party.Venue = "Kingsway, London";

            Assert.AreEqual("Kingsway, London", party.Venue);

            party.Venue = null;
            Assert.IsNull(party.Venue);
        }

        [Test]
        public void PartyStartTimeGetSet_Test()
        {
            party.StartDateTime = new DateTime(2021, 05, 04, 17, 00, 00);

            Assert.AreEqual(new DateTime(2021, 05, 04, 17, 00, 00), party.StartDateTime);
        }
        [Test]
        public void PartyEndTimeGetSet_Test()
        {
            party.EndDateTime = new DateTime(2021, 05, 04, 22, 00, 00);

            Assert.AreEqual(new DateTime(2021, 05, 04, 22, 00, 00), party.EndDateTime);
        }
    }
}
