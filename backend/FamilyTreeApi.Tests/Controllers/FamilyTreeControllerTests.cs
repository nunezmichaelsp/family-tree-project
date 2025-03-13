using FamilyTreeApi.API.Controllers;
using FamilyTreeApi.Application.Interfaces;
using FamilyTreeApi.Domain.Entities;

using Microsoft.AspNetCore.Mvc;

using Moq;


namespace FamilyTreeApi.Tests.Controllers
{
    public class FamilyTreeControllerTests
    {
        private readonly Mock<IPersonService> mockPersonService;

        public FamilyTreeControllerTests()
        {
            this.mockPersonService = new Mock<IPersonService>();
        }

        [Fact]
        public void GetFamilyTree_ReturnsOkResultWithCorrectData()
        {
            // Arrange
            var familyTreeId = Guid.NewGuid();
            var people = new List<Person>
            {
                new Person { Id = Guid.NewGuid(), GivenName = "John", Surname = "Doe" },
                new Person { Id = Guid.NewGuid(), GivenName = "Jane", Surname = "Smith" }
            };

            this.mockPersonService
                .Setup(service => service.GetFamilyTree(familyTreeId))
                .Returns(people);

            this.mockPersonService
                .Setup(service => service.FormatPersonLabel(It.IsAny<Person>()))
                .Returns<Person>(person => $"{person.GivenName} {person.Surname}");

            var controller = new FamilyTreeController(this.mockPersonService.Object);

            // Act
            var result = controller.GetFamilyTree(familyTreeId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedData = Assert.IsAssignableFrom<IEnumerable<object>>(okResult.Value);

            Assert.Equal(people.Count, returnedData.Count());
        }

        [Fact]
        public void GetFamilyTree_ReturnsEmptyList_WhenNoPeopleFound()
        {
            // Arrange
            var familyTreeId = Guid.NewGuid();

            this.mockPersonService
                .Setup(service => service.GetFamilyTree(familyTreeId))
                .Returns(new List<Person>());

            var controller = new FamilyTreeController(this.mockPersonService.Object);

            // Act
            var result = controller.GetFamilyTree(familyTreeId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedData = Assert.IsAssignableFrom<IEnumerable<object>>(okResult.Value);

            Assert.Empty(returnedData);
        }
    }
}
