namespace BgPropertiesServer.Services
{
    using BgPropertiesServer.ViewModels.ApplicationUser;
    using Microsoft.AspNetCore.Identity;
    using System.IdentityModel.Tokens.Jwt;
    using System.Threading.Tasks;

    public interface IAuthService
    {
        Task<IdentityResult> ServeRegister(RegisterModel model);

        JwtSecurityToken GenerateJwtToken(LoginModel model);
    }
}
