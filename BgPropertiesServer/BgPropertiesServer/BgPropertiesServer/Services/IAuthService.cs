namespace BgPropertiesServer.Services
{
    using BgPropertiesServer.Data.Models;
    using BgPropertiesServer.ViewModels.ApplicationUser;
    using Microsoft.AspNetCore.Identity;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Threading.Tasks;

    public interface IAuthService
    {
        Task<IdentityResult> ServeRegister(RegisterModel model);

        JwtSecurityToken GenerateJwtToken(LoginModel model);

        ClaimsPrincipal ValidateToken(string jwtToken);

        Task<ApplicationUser> IdentifyUserByAuthorizationHeader(string headerValue);
    }
}
