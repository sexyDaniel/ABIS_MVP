using ABIS.Common.DTOs.UserDTOs;
using ABIS.Common.Entities;
using ABIS.Common.Enums;
using ABIS.Common.Exceptions;
using ABIS.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

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

        public async Task ChangePassword(ChangePasswordDTO passwordDTO)
        {
            var token = await _context.Tokens
                .FirstOrDefaultAsync(t => t.Email == passwordDTO.Email && t.Value == passwordDTO.Token);

            if (token == null) 
            {
                throw new NotFoundException("Токен не найден");
            }

            var user = await _context.Users
                .SingleOrDefaultAsync(u => u.Email == passwordDTO.Email);

            if (user == null) 
            {
                throw new NotFoundException("Пользователь не найден");
            }
            var salt = _securityService.GetRandomBytes(32);
            var passwordHash = _securityService.GetPasswordHash(passwordDTO.Password, salt);

            user.PasswordHash = passwordHash;
            user.Salt = Convert.ToBase64String(salt);

            await _context.SaveChangesAsync();
            await _tokenService.DeletePasswordToken(passwordDTO.Email);
        }

        public async Task CreateUserAsync(CreateUserDTO userDTO, Guid? adminId)
        {
            var isCompanyExists = await _context.Companies
                .Include(c => c.Users)
                .AnyAsync(c => c.Id == userDTO.CompanyId && c.Users.Any(u => u.Id == adminId));

            if (!isCompanyExists)
            {
                throw new NotFoundException($"Такой компании не существует");
            }

            var isUserExist = await _context.Users
                .Select(u => u.Email)
                .AnyAsync(u => u == userDTO.Email);

            if (isUserExist)
            {
                throw new BusinessLogicException($"Такой пользователь уже существует");
            }

            var user = new User()
            {
                Email = userDTO.Email,
                Role = userDTO.Role,
                CompanyId = userDTO.CompanyId
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            await _emailService.SendEmailForPassword(
                new string[] { userDTO.Email },
                userDTO.PasswordSavedLink);
        }

        public async Task CreateUsersAsync(CreateUsersDTO usersDTO ,Guid? adminId)
        {
            var isCompanyExists = await _context.Companies
                .Include(c => c.Users)
                .AnyAsync(c => c.Id == usersDTO.CompanyId && c.Users.Any(u => u.Id == adminId));

            if (!isCompanyExists) 
            {
                throw new NotFoundException($"Такой компании не существует");
            }

            var existsUsers = await _context.Users
                .Select(u => u.Email)
                .Where(u => usersDTO.Emails.Contains(u))
                .ToListAsync();

            if (existsUsers.Count > 0) 
            {
                throw new BusinessLogicException($"Следующие пользователи уже существуют: {string.Join(" ", existsUsers)}");
            }

            var users = usersDTO.Emails
                .Select(dto => new User() 
                { 
                    Email = dto,
                    Role = Roles.User,
                    CompanyId = usersDTO.CompanyId
                });

            await _context.Users.AddRangeAsync(users);
            await _context.SaveChangesAsync();

            await _emailService.SendEmailForPassword(
                usersDTO.Emails.ToArray(), 
                usersDTO.PasswordSavedLink);
        }

        public Task DeleteUserAsync()
        {
            throw new NotImplementedException();
        }

        public Task UpdateUserAsync()
        {
            throw new NotImplementedException();
        }
    }
}
