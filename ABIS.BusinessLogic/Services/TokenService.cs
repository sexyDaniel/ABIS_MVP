using ABIS.Common.Entities;
using ABIS.Common.Exceptions;
using ABIS.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ABIS.BusinessLogic.Services
{
    public class TokenService : ITokenService
    {
        private readonly IDbContext _context;
        private readonly ISecurityService _securityService;
        public TokenService(IDbContext context, ISecurityService securityService)
        {
            _context = context;
            _securityService = securityService;
        }

        public async Task<string> CreatePasswordToken(string email)
        {
            var isTokenExist = await _context.Tokens
                .AnyAsync(t => t.Email == email);

            if (isTokenExist) 
            {
                throw new BusinessLogicException("Токен для пользователя уже есть");
            }

            var token = Convert.ToBase64String(_securityService.GetRandomBytes(15));

            await _context.Tokens.AddAsync(new Token() 
            {
                Email = email, 
                Value = token
            });
            await _context.SaveChangesAsync();

            return token;
        }

        public async Task DeletePasswordToken(string email)
        {
            var token = await _context.Tokens
                .FirstOrDefaultAsync(t => t.Email == email);

            if (token == null) 
            {
                throw new NotFoundException("Токен не найден");
            }

            _context.Tokens.Remove(token);
            await _context.SaveChangesAsync();
        }
    }
}
