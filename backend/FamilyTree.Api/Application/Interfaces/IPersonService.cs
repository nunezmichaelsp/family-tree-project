using FamilyTreeApi.Domain.Entities;

namespace FamilyTreeApi.Application.Interfaces
{
    public interface IPersonService
    {
        IEnumerable<Person> GetFamilyTree(Guid familyTreeId);
        string FormatPersonLabel(Person person);
    }
}
