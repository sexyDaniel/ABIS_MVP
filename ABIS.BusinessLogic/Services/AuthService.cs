using ABIS.BusinessLogic.ValidationRules;
using ABIS.Common.DTOs.AuthDTOs;
using ABIS.Common.Entities;
using ABIS.Common.Exceptions;
using ABIS.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ABIS.BusinessLogic.Services
{
    public class AuthService : IAuthService
    {
        private readonly IDbContext _context;
        private readonly ISecurityService _securityService;
        public AuthService(IDbContext context, ISecurityService securityService)
        {
            _context = context;
            _securityService = securityService;
        }
        public async Task<CheckEmailDTO> CheckEmailAsync(string email)
        {
            var user = await _context.Users
                .Select(u => new {u.Email, u.PasswordHash })
                .SingleOrDefaultAsync(u => u.Email == email);

            if (user == null) 
            {
                throw new NotFoundException("Email не найден");
            }

            return new CheckEmailDTO() 
            {
                IsPasswordExists = user.PasswordHash != null,
            };
        }

        public async Task<AuthResponse> RegistrationAsync(RegistrationDTO registrationDTO)
        {
            var validationErrors = new AuthValidationRules()
                .CheckEmail(registrationDTO.Email)
                .CheckPassword(registrationDTO.Password)
                .CheckFirstName(registrationDTO.FirstName, 50)
                .CheckLastName(registrationDTO.LastName, 50)
                .GetErrors();

            if (validationErrors.Count > 0) 
            {
                throw new ValidationException(string.Join(' ', validationErrors));
            }

            var isUserExixts = await _context.Users
                .AnyAsync(u => u.Email == registrationDTO.Email);

            if (isUserExixts) 
            {
                throw new BusinessLogicException("Такой пользователь уже есть");
            }

            var salt = _securityService.GetRandomBytes(32);

            var user = new User()
            {
                Email = registrationDTO.Email,
                PasswordHash = _securityService.GetPasswordHash(registrationDTO.Password, salt),
                Salt = Convert.ToBase64String(salt),
                FirstName = registrationDTO.FirstName,
                LastName = registrationDTO.LastName,
                Role = registrationDTO.Role
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return new AuthResponse() { AccessToken = _securityService.GetJwtToken(user) };
        }

        public async Task<AuthResponse> LoginAsync(LoginDTO loginDTO)
        {
            var validationErrors = new AuthValidationRules()
                .CheckEmail(loginDTO.Email)
                .CheckPassword(loginDTO.Password)
                .GetErrors();

            if (validationErrors.Count > 0)
            {
                throw new ValidationException(string.Join(' ', validationErrors));
            }

            var user = await _context.Users
                .SingleOrDefaultAsync(u => u.Email == loginDTO.Email);

            if (user == null)
            {
                throw new NotFoundException("Email не существует");
            }

            var passwordHash = _securityService.GetPasswordHash(loginDTO.Password,Convert.FromBase64String(user.Salt));

            if (passwordHash != user.PasswordHash) 
            {
                throw new UnauthorizedException("Неверный пароль");
            }

            return new AuthResponse() 
            {
                AccessToken = _securityService.GetJwtToken(user)
            };
        }
    }
}
