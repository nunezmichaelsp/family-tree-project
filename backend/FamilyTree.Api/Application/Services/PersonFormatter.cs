using FamilyTreeApi.Domain.Entities;

namespace FamilyTreeApi.Application.Services
{
    public static class PersonFormatter
    {
        public static string FormatLifeSpan(Person person)
        {
            if (person.DeathDate.HasValue && person.BirthDate.HasValue)
                return $"({person.BirthDate?.Year}-{person.DeathDate?.Year})";

            if (person.DeathDate.HasValue)
                return $"(-{person.DeathDate?.Year})";

            if (!person.DeathDate.HasValue && person.BirthDate.HasValue)
            {
                if (person.BirthDate?.Year >= DateTime.Now.Year - 120)
                    return "(Living)";
                return $"({person.BirthDate?.Year}-)";
            }

            return "(Living)";
        }

        public static string FormatFullNameWithLifeSpan(Person person)
        {
            return $"{person.GivenName} {person.Surname} {FormatLifeSpan(person)}";
        }
    }
}
