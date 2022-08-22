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

        public async Task<Token[]> CreatePasswordTokens(Token[] newTokens)
        {
            var tokens = await _context.Tokens
                .Where(t => newTokens.Select(nt=> nt.Email).Contains(t.Email))
                .ToListAsync();

            var correctTokens = newTokens.Where(nt => !tokens.Any(t => nt.Email == t.Email));

            await _context.Tokens.AddRangeAsync(correctTokens);
            await _context.SaveChangesAsync();

            return correctTokens.ToArray();
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
