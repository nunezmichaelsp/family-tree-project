using FamilyTreeApi.Application.Interfaces;

using Microsoft.AspNetCore.Mvc;

namespace FamilyTreeApi.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FamilyTreeController : ControllerBase
{
    private readonly IPersonService personService;

    public FamilyTreeController(IPersonService personService)
    {
        this.personService = personService ?? throw new ArgumentNullException(nameof(personService));
    }

    [HttpGet("{familyTreeId:guid}/people")]
    public IActionResult GetFamilyTree(Guid familyTreeId)
    {
        // Retrieve the family tree people using the service
        var people = this.personService.GetFamilyTree(familyTreeId);

        // Map to the required format (value/label) using the service
        return this.Ok(people.Select(person => new
        {
            value = person.Id,
            label = this.personService.FormatPersonLabel(person),
        }).OrderBy(p => p.label).DistinctBy(p => p.label));
    }
}