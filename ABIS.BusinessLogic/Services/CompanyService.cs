using ABIS.BusinessLogic.ValidationRules;
using ABIS.Common.DTOs.CompanyDTOs;
using ABIS.Common.DTOs.UserDTOs;
using ABIS.Common.Entities;
using ABIS.Common.Enums;
using ABIS.Common.Exceptions;
using ABIS.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ABIS.BusinessLogic.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly IDbContext _context;

        public CompanyService(IDbContext context)
        {
            _context = context;
        }

        public async Task CreateCompanyAsync(CreateCompanyDTO createCompanyDTO, Guid? adminId)
        {
            var errors = new CompanyValidationRules()
                .CheckDomainName(createCompanyDTO.DomainName)
                .CheckName(createCompanyDTO.Name)
                .GetErrors();

            if (errors.Count > 0) 
            {
                throw new ValidationException(string.Join(' ', errors));
            }

            var isCompanyExists = await _context.Companies
                .AnyAsync(c => c.Name == createCompanyDTO.Name || c.DomainName == createCompanyDTO.DomainName);

            if (isCompanyExists) 
            {
                throw new BusinessLogicException("Компания с таким доменом или иненем уже есть");
            }

            var company = new Company()
            {
                Name = createCompanyDTO.Name,
                DomainName = createCompanyDTO.DomainName
            };

            var user = await _context.Users.SingleOrDefaultAsync(u=>u.Id == adminId);
            company.Users.Add(user);

            await _context.Companies.AddAsync(company);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCompanyAsync(int id, Guid? adminId)
        {
            var company = await _context.Companies
                .Include(c => c.Users.Where(u=>u.Id == adminId))
                .SingleOrDefaultAsync(c => c.Id == id && c.Users.Count == 1);

            if (company == null) 
            {
                throw new NotFoundException("Такой компани нет");
            }

            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();
        }

        public async Task<ICollection<GetCompanyDTO>> GetCompanysAsync(Guid? id)
        {
            var companies = await _context.Companies
                .Include(c => c.Users.Where(c => c.Id == id))
                .Where(c => c.Users.Any(u => u.Id == id))
                .Select(c => new GetCompanyDTO() 
                {
                    Id = c.Id,
                    Name = c.Name,
                    DomainName = c.DomainName
                })
                .ToListAsync();

            return companies;
        }

        public async Task<ICollection<CompanyUserDTO>> GetCompanyUsersAsync(Guid? adminId, int companyId, Roles role)
        {
            var isCompanyExist = await _context.Companies
                .Include(c => c.Users)
                .Where(c => c.Users.Any(u => u.Id == adminId))
                .AnyAsync(c => c.Id == companyId);

            if (!isCompanyExist) 
            {
                throw new NotFoundException("Такой компани нет");
            }

            var users = await _context.Users
                .Include(u => u.Companies)
                .Where(u => u.Companies.Any(c => c.Id == companyId) && u.Role == role && u.Id != adminId)
                .Select(u => new CompanyUserDTO()
                {
                    Id = u.Id,
                    Email = u.Email,
                    FirstName = u.FirstName,
                    LastName = u.LastName
                })
                .ToListAsync();

            return users;
        }

        public async Task UpdateCompanyAsync(UpdateCompanyDTO updateCompanyDTO)
        {
            var errors = new CompanyValidationRules()
                .CheckDomainName(updateCompanyDTO.DomainName)
                .CheckName(updateCompanyDTO.Name)
                .GetErrors();

            if (errors.Count > 0)
            {
                throw new ValidationException(string.Join(' ', errors));
            }

            var isCompanyExists = await _context.Companies
                .AnyAsync(c => (c.Name == updateCompanyDTO.Name || c.DomainName == updateCompanyDTO.DomainName) 
                && c.Id != updateCompanyDTO.Id);

            if (isCompanyExists)
            {
                throw new BusinessLogicException("Компания с таким доменом или иненем уже есть");
            }

            var company = await _context.Companies
                .SingleOrDefaultAsync(c => c.Id == updateCompanyDTO.Id);

            if (company == null) 
            {
                throw new NotFoundException("Такой компани нет");
            }

            company.DomainName = updateCompanyDTO.DomainName;
            company.Name = updateCompanyDTO.Name;

            await _context.SaveChangesAsync();
        }
    }
}
