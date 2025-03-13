using FamilyTreeApi.Application.Interfaces;
using FamilyTreeApi.Data.Repositories;
using FamilyTreeApi.Domain.Entities;

namespace FamilyTreeApi.Application.Services
{
    public class PersonService : IPersonService
    {
        private readonly IFamilyTreeRepository familyTreeRepository;

        public PersonService(IFamilyTreeRepository familyTreeRepository)
        {
            this.familyTreeRepository = familyTreeRepository ?? throw new ArgumentNullException(nameof(familyTreeRepository));
        }

        public IEnumerable<Person> GetFamilyTree(Guid familyTreeId)
        {
            return this.familyTreeRepository.GetFamilyTreeMembers(familyTreeId);
        }

        public string FormatPersonLabel(Person person)
        {
            return PersonFormatter.FormatFullNameWithLifeSpan(person);
        }
    }
}
