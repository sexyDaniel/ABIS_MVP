using ABIS.BusinessLogic.ValidationRules;
using ABIS.Common.DTOs.AuthDTOs;
using ABIS.Common.DTOs.UserDTOs;
using ABIS.Common.Entities;
using ABIS.Common.Enums;
using ABIS.Common.Exceptions;
using ABIS.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Web;

namespace ABIS.BusinessLogic.Services
{
    public class UserService : IUserService
    {
        private readonly IEmailService _emailService;
        private readonly ITokenService _tokenService;
        private readonly ISecurityService _securityService;
        private readonly IDbContext _context;
        public UserService(IEmailService emailService, IDbContext context, ITokenService tokenService, ISecurityService securityService)
        {
            _emailService = emailService;
            _context = context;
            _tokenService = tokenService;
            _securityService = securityService;
        }

        public async Task<AuthResponse> ChangePassword(ChangePasswordDTO passwordDTO)
        {
            var decodedEmail = HttpUtility.UrlDecode(passwordDTO.Email);
            var decodedToken = HttpUtility.UrlDecode(passwordDTO.Token);
            var token = await _context.Tokens
                .FirstOrDefaultAsync(t => t.Email == decodedEmail && t.Value == decodedToken);

            if (token == null) 
            {
                throw new NotFoundException("Токен не найден");
            }

            var company = await _context.Companies
                .SingleOrDefaultAsync(c => c.Id == token.CompanyId);

            if (company == null)
            {
                throw new NotFoundException("Компания не найдена");
            }

            var isUserExists = await _context.Users
                .AnyAsync(u => u.Email == decodedEmail);

            if (isUserExists) 
            {
                await _tokenService.DeletePasswordToken(decodedEmail);
                throw new NotFoundException("Пользователь уже есть");
            }
            var salt = _securityService.GetRandomBytes(32);
            var passwordHash = _securityService.GetPasswordHash(passwordDTO.Password, salt);

            var user = new User()
            {
                PasswordHash = passwordHash,
                Salt = Convert.ToBase64String(salt),
                Role = token.Role,
                Email = decodedEmail,
            };

            company.Users.Add(user);

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            await _tokenService.DeletePasswordToken(decodedEmail);

            return new AuthResponse() { AccessToken = _securityService.GetJwtToken(user) };
        }

        public async Task CreateUserAsync(CreateUserDTO userDTO, Guid? adminId)
        {
            var errors = new UserValidationRules()
                .CheckRole(userDTO.Role)
                .CheckPasswordSavedLink(userDTO.PasswordSavedLink)
                .CheckEmails(new string[] { userDTO.Email})
                .GetErrors();

            if (errors.Count > 0)
            {
                throw new ValidationException(string.Join(' ', errors));
            }

            var company = await _context.Companies
                .Include(c => c.Users)
                .SingleOrDefaultAsync(c => c.Id == userDTO.CompanyId && c.Users.Any(u => u.Id == adminId));

            if (company == null)
            {
                throw new NotFoundException($"Такой компании не существует");
            }

            var user = await _context.Users
                .SingleOrDefaultAsync(u => u.Email == userDTO.Email);

            if (user != null)
            {
                await AddUsersToCompany(new User[] { user }, company);
                return;
            }

            var token = new Token()
            {
                Email = userDTO.Email,
                Role = userDTO.Role,
                CompanyId = userDTO.CompanyId,
                Value = Convert.ToBase64String(_securityService.GetRandomBytes(15))
            };

            await _tokenService.CreatePasswordTokens(new Token[] { token});
            await _emailService.SendEmailForPassword(
                new Token[] { token },
                userDTO.PasswordSavedLink);
        }

        public async Task CreateUsersAsync(CreateUsersDTO usersDTO ,Guid? adminId)
        {
            var errors = new UserValidationRules()
                .CheckPasswordSavedLink(usersDTO.PasswordSavedLink)
                .CheckEmails(usersDTO.Emails)
                .GetErrors();

            if (errors.Count > 0)
            {
                throw new ValidationException(string.Join(' ', errors));
            }

            var company = await _context.Companies
                .Include(c => c.Users)
                .SingleOrDefaultAsync(c => c.Id == usersDTO.CompanyId && c.Users.Any(u => u.Id == adminId));

            if (company == null) 
            {
                throw new NotFoundException($"Такой компании не существует");
            }

            var existsUsers = await _context.Users
                .Where(u => usersDTO.Emails.Contains(u.Email))
                .ToListAsync();

            if (existsUsers.Count > 0) 
            {
                await AddUsersToCompany(existsUsers, company);
            }

            var tokens = usersDTO.Emails
                .Where(e => !existsUsers.Any(u => u.Email == e))
                .Select(e => new Token()
                {
                    Email = e,
                    Role = Roles.User,
                    CompanyId = usersDTO.CompanyId,
                    Value = Convert.ToBase64String(_securityService.GetRandomBytes(15))
                }).ToArray();

            var correctTokens = await _tokenService.CreatePasswordTokens(tokens);
            await _context.SaveChangesAsync();

            await _emailService.SendEmailForPassword(
                correctTokens,
                usersDTO.PasswordSavedLink);
        }

        public async Task DeleteUserAsync(Guid? id)
        {
            var user = await _context.Users
                .SingleOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                throw new NotFoundException($"Такого пользователя нет");
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateUserAsync(UpdateUserDTO updateUserDTO, Guid? userId)
        {
            var errors = new UserValidationRules()
                .CheckEmails(new string[] { updateUserDTO.Email})
                .GetErrors();

            if (errors.Count > 0) 
            {
                throw new ValidationException(string.Join(' ', errors));
            }

            var user = await _context.Users.SingleOrDefaultAsync(u => u.Id == userId);

            if (user == null) 
            {
                throw new NotFoundException($"Такого пользователя нет");
            }

            user.Email = updateUserDTO.Email;
            user.FirstName = updateUserDTO.FirstName;
            user.LastName = updateUserDTO.LastName;

            await _context.SaveChangesAsync();
        }

        private async Task AddUsersToCompany(ICollection<User> users, Company company) 
        {
            foreach (var u in users) 
            {
                if (!company.Users.Any(user => user.Id == u.Id)) 
                {
                    company.Users.Add(u);
                }
            }

            await _context.SaveChangesAsync();
        }
    }
}
