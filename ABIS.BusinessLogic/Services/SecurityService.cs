using ABIS.Common.Entities;
using ABIS.Common.Interfaces;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace ABIS.BusinessLogic.Services
{
    public class SecurityService : ISecurityService
    {
        private readonly IConfiguration _configuration;

        public SecurityService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GetJwtToken(User user)
        {
            var jwtHandler = new JwtSecurityTokenHandler();

            var claims = new Claim[]
            {
                new Claim(ClaimTypes.Role, user.Role.ToString()),
                new Claim(ClaimTypes.Email, user.Email ),
                new Claim(ClaimTypes.Sid, user.Id.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Audience = _configuration["JWT:Audience"],
                Expires = DateTime.UtcNow.AddMonths(1),
                Issuer = _configuration["JWT:Issuer"],
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256),
                Subject = new ClaimsIdentity(claims)
            };

            var token = jwtHandler.CreateToken(tokenDescriptor);

            return jwtHandler.WriteToken(token);
        }

        public string GetPasswordHash(string password, byte[] salt)
        {
            var passwordBytes = KeyDerivation.Pbkdf2(
            password: password,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 10000,
            numBytesRequested: 32);

            return Convert.ToBase64String(passwordBytes);
        }

        public byte[] GetRandomBytes(int size = 16)
        {
            var bytes = new byte[size];

            using var random = RandomNumberGenerator.Create();
            random.GetBytes(bytes);

            return bytes;
        }
    }
}
