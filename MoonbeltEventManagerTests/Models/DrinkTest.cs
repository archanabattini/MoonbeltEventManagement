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
    public class DrinkTest
    {
        Drink drink;

        [SetUp]
        public void setup()
        {
            drink = new Drink();
        }

        [Test]
        public void DrinkIdGetSet_Test() // test for get and set
        {
            drink.Id = 1;

            Assert.AreEqual(1, drink.Id);
        }
        [Test]
        public void DrinkNameGetSet_Test()
        {
            drink.Name = "Coke";

            Assert.AreEqual("Coke", drink.Name);

            drink.Name = null;
            Assert.IsNull(drink.Name);
        }

    }
}
