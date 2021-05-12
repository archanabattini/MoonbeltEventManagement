using Microsoft.EntityFrameworkCore;
using MoonbeltEventManager.Models;
using MoonbeltEventManager.Repository;
using Moq;
using NUnit.Framework;

namespace MoonbeltEventManagerTests
{
    public class DrinksRepositoryTests
    {
        DrinksRepository repo;

        [SetUp]
        public void Setup()
        {
            var dbContextMock = new Mock<MoonbeltContext>();
            var dbSetMock = new Mock<DbSet<Drink>>();
            dbSetMock.Setup(s => s.FindAsync(It.IsAny<int>())).Returns(Task.FromResult(new Drink()));

            dbContextMock.Setup(s => s.Set<Drink>()).Returns(dbSetMock.Object);

            repo = new DrinksRepository(dbContextMock.Object);
            var drink = repo.GetDrinkById(1).Result;

            //Assert  
            Assert.NotNull(drink);
            Assert.IsAssignableFrom<Drink>(drink);
        }

        [Test]
        public void Test1()
        {
            Assert.Pass();
        }
    }
}