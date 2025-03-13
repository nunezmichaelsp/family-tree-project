using FamilyTreeApi.Data.Repositories;

namespace FamilyTreeApi.Tests.Repositories
{
    public class InMemoryFamilyTreeRepositoryTests
    {
        [Fact]
        public void GetFamilyTreeMembers_ReturnsCorrectPeople()
        {
            // Arrange
            var repository = new InMemoryFamilyTreeRepository();
            var familyTreeId = Guid.Parse("11111111-1111-1111-1111-111111111111");

            // Act
            var members = repository.GetFamilyTreeMembers(familyTreeId).ToList();

            // Assert
            Assert.NotEmpty(members);
            Assert.Contains(members, person => person.GivenName == "Rachel");
        }

        [Fact]
        public void GetFamilyTreeMembers_ReturnsEmpty_WhenFamilyTreeNotFound()
        {
            // Arrange
            var repository = new InMemoryFamilyTreeRepository();

            // Act
            var members = repository.GetFamilyTreeMembers(Guid.NewGuid());

            // Assert
            Assert.Empty(members);
        }
    }
}
