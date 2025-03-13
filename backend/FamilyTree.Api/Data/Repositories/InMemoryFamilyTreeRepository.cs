using FamilyTreeApi.Domain.Entities;
using FamilyTreeApi.Domain.Enums;

namespace FamilyTreeApi.Data.Repositories
{
    public class InMemoryFamilyTreeRepository : IFamilyTreeRepository
    {
        private readonly ICollection<Person> people = new List<Person>();
        private readonly ICollection<FamilyTree> familyTrees = new List<FamilyTree>();


        public InMemoryFamilyTreeRepository()
        {
            var friendsFamilyTree = new List<Person>
            {
                new Person
                {
                    Id = Guid.NewGuid(),
                    GivenName = "Rachel",
                    Surname = "Green",
                    Gender = Gender.Female,
                    BirthDate = new DateTime(1969, 5, 5),
                    DeathDate = new DateTime(2070, 12, 31),
                    BirthLocation = "New York, USA",
                    DeathLocation = "Los Angeles, USA",
                },
                new Person
                {
                    Id = Guid.NewGuid(),
                    GivenName = "Monica",
                    Surname = "Geller",
                    Gender = Gender.Female,
                    BirthDate = new DateTime(1964, 4, 22),
                    DeathDate = new DateTime(2075, 1, 1),
                    BirthLocation = "New York, USA",
                    DeathLocation = "New York, USA"
                },
                new Person
                {
                    Id = Guid.NewGuid(),
                    GivenName = "Joey",
                    Surname = "Tribbiani",
                    Gender = Gender.Male,
                    BirthDate = new DateTime(1968, 1, 9),
                    DeathDate = null,
                    BirthLocation = "New York, USA",
                    DeathLocation = string.Empty
                },
                new Person
                {
                    Id = Guid.NewGuid(),
                    GivenName = "Chandler",
                    Surname = "Bing",
                    Gender = Gender.Male,
                    BirthDate = null,
                    DeathDate = new DateTime(2023, 6, 15),
                    BirthLocation = string.Empty,
                    DeathLocation = "New York, USA"
                },
                new Person
                {
                    Id = Guid.NewGuid(),
                    GivenName = "Phoebe",
                    Surname = "Buffay",
                    Gender = Gender.Female,
                    BirthDate = new DateTime(1900, 2, 16),
                    DeathDate = null,
                    BirthLocation = "New York, USA",
                    DeathLocation = string.Empty
                },
                new Person
                {
                    Id = Guid.NewGuid(),
                    GivenName = "Ross",
                    Surname = "Geller",
                    Gender = Gender.Male,
                    BirthDate = null,
                    DeathDate = null,
                    BirthLocation = "New York, USA",
                    DeathLocation = "New York, USA"
                },
                new Person
                {
                    Id = Guid.NewGuid(),
                    GivenName = "Princesa Consuela",
                    Surname = "Banana Hamaca",
                    BirthDate = new DateTime(1877, 5, 1),
                    DeathDate = new DateTime(1941, 12, 31),
                    BirthLocation = "New York",
                    DeathLocation = "Boston",
                    Gender = Gender.Female
                },
                new Person
                {
                    Id = Guid.NewGuid(),
                    GivenName = "Janice",
                    Surname = "Hosenstein",
                    Gender = Gender.Female,
                    BirthDate = new DateTime(1900, 1, 1),
                    DeathDate = null,
                    BirthLocation = "New York, USA",
                    DeathLocation = string.Empty
                }
            };

            var theBigBangTheoryFamilyTree = new List<Person>
            {
                new Person
                {
                    Id = Guid.NewGuid(),
                    GivenName = "Sheldon",
                    Surname = "Cooper",
                    Gender = Gender.Male,
                    BirthDate = new DateTime(1980, 2, 26),
                    DeathDate = new DateTime(2070, 12, 31),
                    BirthLocation = "Galveston, USA",
                    DeathLocation = "Los Angeles, USA",
                },
                new Person
                {
                    Id = Guid.NewGuid(),
                    GivenName = "Leonard",
                    Surname = "Hofstadter",
                    Gender = Gender.Male,
                    BirthDate = new DateTime(1980, 5, 17),
                    DeathDate = new DateTime(2075, 1, 1),
                    BirthLocation = "New Jersey, USA",
                    DeathLocation = "New Jersey, USA"
                },
                new Person
                {
                    Id = Guid.NewGuid(),
                    GivenName = "Howard",
                    Surname = "Wolowitz",
                    Gender = Gender.Male,
                    BirthDate = new DateTime(1981, 3, 24),
                    DeathDate = null,
                    BirthLocation = "Pasadena, USA",
                    DeathLocation = string.Empty
                },
                new Person
                {
                    Id = Guid.NewGuid(),
                    GivenName = "Rajesh",
                    Surname = "Koothrappali",
                    Gender = Gender.Male,
                    BirthDate = null,
                    DeathDate = new DateTime(2023, 6, 15),
                    BirthLocation = string.Empty,
                    DeathLocation = "New Delhi, India"
                },
                new Person
                {
                    Id = Guid.NewGuid(),
                    GivenName = "Penny",
                    Surname = "Hofstadter",
                    Gender = Gender.Female,
                    BirthDate = new DateTime(1985, 12, 2),
                    DeathDate = null,
                    BirthLocation = "Omaha, USA",
                    DeathLocation = string.Empty
                },
                new Person
                {
                    Id = Guid.NewGuid(),
                    GivenName = "Amy",
                    Surname = "Farrah Fowler",
                    Gender = Gender.Female,
                    BirthDate = null,
                    DeathDate = null,
                    BirthLocation = "Glendale, USA",
                    DeathLocation = "Glendale, USA"
                },
                new Person
                {
                    Id = Guid.NewGuid(),
                    GivenName = "Bernadette",
                    Surname = "Rostenkowski-Wolowitz",
                    BirthDate = new DateTime(1984, 6, 1),
                    DeathDate = new DateTime(1941, 12, 31),
                    BirthLocation = "California, USA",
                    DeathLocation = "Boston",
                    Gender = Gender.Female
                },
                new Person
                {
                    Id = Guid.NewGuid(),
                    GivenName = "Leslie",
                    Surname = "Winkle",
                    Gender = Gender.Female,
                    BirthDate = new DateTime(1980, 1, 1),
                    DeathDate = null,
                    BirthLocation = "New York, USA",
                    DeathLocation = string.Empty
                }
            };

            this.people = friendsFamilyTree.Concat(theBigBangTheoryFamilyTree).ToList();

            this.familyTrees = new List<FamilyTree>
            {
                new FamilyTree
                {
                    Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                    MemberIds = friendsFamilyTree.Select(p => p.Id).ToList()
                },
                new FamilyTree
                {
                    Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                    MemberIds = theBigBangTheoryFamilyTree.Select(p => p.Id).ToList()
                }
            };
        }

        public IEnumerable<Person> GetFamilyTreeMembers(Guid familyTreeId)
        {
            var familyTree = this.familyTrees.FirstOrDefault(tree => tree.Id == familyTreeId);

            if (familyTree == null)
            {
                return Enumerable.Empty<Person>();
            }

            return this.people.Where(person => familyTree.MemberIds.Contains(person.Id));
        }
    }
}
