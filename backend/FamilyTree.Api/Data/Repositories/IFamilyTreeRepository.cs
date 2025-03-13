using FamilyTreeApi.Domain.Entities;

namespace FamilyTreeApi.Data.Repositories
{
    public interface IFamilyTreeRepository
    {
        IEnumerable<Person> GetFamilyTreeMembers(Guid familyTreeId);
    }
}
