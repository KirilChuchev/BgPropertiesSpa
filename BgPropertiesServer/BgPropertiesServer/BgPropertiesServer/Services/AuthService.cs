namespace BgPropertiesServer.Services
{
    using System;
    using System.Linq;
    using System.Text;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using System.Net.Http.Headers;
    using BgPropertiesServer.Data;
    using System.Collections.Generic;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using BgPropertiesServer.Data.Models;
    using Microsoft.IdentityModel.Logging;
    using Microsoft.IdentityModel.Tokens;
    using System.IdentityModel.Tokens.Jwt;
    using Microsoft.Extensions.Configuration;
    using BgPropertiesServer.ViewModels.ApplicationUser;

    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration configuration;
        private readonly ApplicationDbContext db;

        public AuthService(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration,
            ApplicationDbContext db
            )
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.configuration = configuration;
            this.db = db;
        }
        public async Task<IdentityResult> ServeRegister(RegisterModel model)
        {
            ApplicationUser user = new ApplicationUser()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await userManager.CreateAsync(user, model.Password);

            return result;
        }

        public JwtSecurityToken GenerateJwtToken(LoginModel model)
        {
            //var userRoles = await userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Email, model.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

            //foreach (var userRole in userRoles)
            //{
            //    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            //}

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtSettings:Secret"]));

            var token = new JwtSecurityToken(
                issuer: configuration["JwtSettings:ValidIssuer"],
                audience: configuration["JwtSettings:ValidAudience"],
                expires: DateTime.Now.AddHours(5),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }

        public ClaimsPrincipal ValidateToken(string jwtToken)
        {
            IdentityModelEventSource.ShowPII = true;

            SecurityToken validatedToken;
            TokenValidationParameters validationParameters = new TokenValidationParameters();

            validationParameters.ValidateLifetime = true;

            validationParameters.ValidAudience = configuration["JwtSettings:ValidIssuer"].ToLower();
            validationParameters.ValidIssuer = configuration["JwtSettings:ValidAudience"].ToLower();
            validationParameters.IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtSettings:Secret"]));

            ClaimsPrincipal principal = new JwtSecurityTokenHandler().ValidateToken(jwtToken, validationParameters, out validatedToken);


            return principal;
        }

        public async Task<ApplicationUser> IdentifyUserByAuthorizationHeader(string headerValue)
        {
            //var identity = HttpContext.User.Identity as ClaimsIdentity;
            //if (identity != null)
            //{
            //    //IEnumerable<Claim> claims = identity.Claims;
            //    // or
            //    var userEmail = identity.FindFirst("Email").Value;

            //}

            if (!AuthenticationHeaderValue.TryParse(headerValue, out var authorizationHeader))
            {
                return null;
            }

            var jwt = authorizationHeader.Parameter;
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(jwt);

            var userEmail = token.Payload.FirstOrDefault(x => x.Key == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress").Value.ToString();
            //var userEmail = this.authService.ValidateToken(headerValue.Parameter)?.FindFirst("Email")?.Value;

            var user = await this.db.AspNetUsers.FirstOrDefaultAsync(x => x.Email == userEmail);

            return user;
        }

    }
}
