using FamilyTreeApi.Domain.Enums;

namespace FamilyTreeApi.Domain.Entities
{
    public class Person
    {
        public Guid Id { get; set; }
        public string GivenName { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public Gender Gender { get; set; }
        public DateTime? BirthDate { get; set; }
        public DateTime? DeathDate { get; set; }
        public string BirthLocation { get; set; } = string.Empty;
        public string DeathLocation { get; set; } = string.Empty;
    }
}
