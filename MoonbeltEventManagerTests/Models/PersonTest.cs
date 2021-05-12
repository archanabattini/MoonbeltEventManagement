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
    public class PersonTest
    {
        Person person;

        [SetUp]
        public void setup()
        {
            person = new Person();
        }


        [Test]
        public void PersonIdGet_Test() // test for get and set
        {
            person.Id = 1;

            Assert.AreEqual(1, person.Id);
        }
        [Test]
        public void PersonFirstNameGetSet_Test()
        {
            person.FirstName = "Archana";

            Assert.AreEqual("Archana", person.FirstName);

            person.FirstName = null;
            Assert.IsNull(person.FirstName);
        }

        public void PersonNameValidate_Test() // test to validate properties
        {
            var result = TestModalHelper.Validate(person);

            Assert.AreEqual(2, result.Count());
            Assert.AreEqual("The First Name field is required.", result[0].ErrorMessage);
            Assert.AreEqual("The Last Name field is required.", result[1].ErrorMessage);

        }
        public void PersonNameValidate_Test2()
        {
            person.FirstName = "Archana";
            person.LastName = "Battini";

            var result = TestModalHelper.Validate(person);

            Assert.AreEqual(0, result.Count());
        }

        [Test]
        public void PersonLastNameGetSet_Test()
        {
            person.LastName = "Battini";

            Assert.AreEqual("Battini", person.LastName);

            person.LastName = null;
            Assert.IsNull(person.LastName);
        }

        [Test]
        public void PersonEmailGetSet_Test()
        {

            person.Email = "xxx.yyy@gmail.com";

            Assert.AreEqual("xxx.yyy@gmail.com", person.Email);

            //TODO: add test for email format.
        }

        [Test]
        public void PersonPhoneNumberGetSet_Test()
        {

            person.PhoneNumber = "1234567890";

            Assert.AreEqual("1234567890", person.PhoneNumber);

            //TODO validation for max length.
        }
    }

}
