using FamilyTreeApi.Application.Services;
using FamilyTreeApi.Data.Repositories;
using FamilyTreeApi.Domain.Entities;

using Moq;

namespace FamilyTreeApi.Tests.Services
{
    public class PersonServiceTests
    {
        private readonly Mock<IFamilyTreeRepository> mockRepository;

        public PersonServiceTests()
        {
            this.mockRepository = new Mock<IFamilyTreeRepository>();
        }

        [Fact]
        public void GetFamilyTree_ReturnsCorrectData()
        {
            // Arrange
            var familyTreeId = Guid.NewGuid();
            var people = new List<Person>
            {
                new Person { Id = Guid.NewGuid(), GivenName = "John", Surname = "Doe" },
                new Person { Id = Guid.NewGuid(), GivenName = "Jane", Surname = "Smith" }
            };

            this.mockRepository
                .Setup(repo => repo.GetFamilyTreeMembers(familyTreeId))
                .Returns(people);

            var service = new PersonService(this.mockRepository.Object);

            // Act
            var result = service.GetFamilyTree(familyTreeId);

            // Assert
            Assert.Equal(people.Count, result.Count());
            Assert.Equal(people[0].Id, result.First().Id);
        }

        [Fact]
        public void FormatPersonLabel_ReturnsCorrectFormat()
        {
            // Arrange
            var person = new Person
            {
                GivenName = "John",
                Surname = "Doe",
                BirthDate = new DateTime(1985, 1, 1),
                DeathDate = new DateTime(2023, 1, 1)
            };

            var service = new PersonService(this.mockRepository.Object);

            // Act
            var result = service.FormatPersonLabel(person);

            // Assert
            Assert.Equal("John Doe (1985-2023)", result);
        }
    }
}
