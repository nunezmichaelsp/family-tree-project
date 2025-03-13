namespace FamilyTreeApi.Domain.Entities
{
    public class FamilyTree
    {
        public Guid Id { get; set; }
        public ICollection<Guid> MemberIds { get; set; }
    }
}
