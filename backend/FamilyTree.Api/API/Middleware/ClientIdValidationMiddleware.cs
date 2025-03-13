using FamilyTreeApi.Crosscutting;

using Microsoft.Extensions.Options;

namespace FamilyTreeApi.API.Middleware
{
    public class ClientIdValidationMiddleware
    {
        private readonly RequestDelegate next;
        private readonly ClientValidationOptions options;

        public ClientIdValidationMiddleware(RequestDelegate next,
            IOptions<ClientValidationOptions> options)
        {
            this.next = next;
            this.options = options.Value;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Validate x-client-id header
            if (!context.Request.Headers.TryGetValue("x-client-id", out var clientId))
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                await context.Response.WriteAsync("Missing x-client-id header.");
                return;
            }

            if (clientId != this.options.ValidClientId)
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync("Invalid x-client-id.");
                return;
            }

            await this.next(context);
        }
    }
}
