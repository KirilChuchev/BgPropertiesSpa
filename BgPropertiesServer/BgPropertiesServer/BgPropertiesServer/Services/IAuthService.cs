namespace BgPropertiesServer.Services
{
    using System.Security.Claims;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Identity;
    using BgPropertiesServer.Data.Models;
    using System.IdentityModel.Tokens.Jwt;
    using BgPropertiesServer.ViewModels.ApplicationUser;

    public interface IAuthService
    {
        Task<IdentityResult> ServeRegister(RegisterModel model);

        JwtSecurityToken GenerateJwtToken(LoginModel model);

        ClaimsPrincipal ValidateToken(string jwtToken);

        Task<ApplicationUser> IdentifyUserByAuthorizationHeader(string headerValue);
    }
}
