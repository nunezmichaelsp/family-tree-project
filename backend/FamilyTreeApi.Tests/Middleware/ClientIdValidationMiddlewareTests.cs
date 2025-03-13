using FamilyTreeApi.API.Middleware;
using FamilyTreeApi.Crosscutting;

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

using Moq;

namespace FamilyTreeApi.Tests.Middleware
{
    public class ClientIdValidationMiddlewareTests
    {
        private readonly string validClientId = "my-constant-client-id";

        private IOptions<ClientValidationOptions> CreateOptionsWrapper()
        {
            return Options.Create(new ClientValidationOptions
            {
                ValidClientId = this.validClientId
            });
        }

        [Fact]
        public async Task InvokeAsync_Returns400_WhenClientIdHeaderIsMissing()
        {
            // Arrange
            var context = new DefaultHttpContext();
            var mockNext = new Mock<RequestDelegate>();

            var middleware = new ClientIdValidationMiddleware(mockNext.Object, CreateOptionsWrapper());

            // Act
            await middleware.InvokeAsync(context);

            // Assert
            Assert.Equal(StatusCodes.Status400BadRequest, context.Response.StatusCode);
        }

        [Fact]
        public async Task InvokeAsync_Returns401_WhenClientIdHeaderIsInvalid()
        {
            // Arrange
            var context = new DefaultHttpContext();
            context.Request.Headers["x-client-id"] = "invalid-client-id";

            var mockNext = new Mock<RequestDelegate>();
            var middleware = new ClientIdValidationMiddleware(mockNext.Object, CreateOptionsWrapper());

            // Act
            await middleware.InvokeAsync(context);

            // Assert
            Assert.Equal(StatusCodes.Status401Unauthorized, context.Response.StatusCode);
        }

        [Fact]
        public async Task InvokeAsync_CallsNextMiddleware_WhenClientIdIsValid()
        {
            // Arrange
            var context = new DefaultHttpContext();
            context.Request.Headers["x-client-id"] = this.validClientId;

            var mockNext = new Mock<RequestDelegate>();
            var middleware = new ClientIdValidationMiddleware(mockNext.Object, CreateOptionsWrapper());

            // Act
            await middleware.InvokeAsync(context);

            // Assert
            Assert.Equal(StatusCodes.Status200OK, context.Response.StatusCode);
            mockNext.Verify(next => next.Invoke(context), Times.Once);
        }
    }
}
