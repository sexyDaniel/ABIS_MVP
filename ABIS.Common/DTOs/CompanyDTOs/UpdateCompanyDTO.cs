using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ABIS.Common.DTOs.CompanyDTOs
{
    public class UpdateCompanyDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string DomainName { get; set; }
    }
}
