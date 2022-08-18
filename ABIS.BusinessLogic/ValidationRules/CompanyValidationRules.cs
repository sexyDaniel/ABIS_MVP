using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ABIS.BusinessLogic.ValidationRules
{
    internal class CompanyValidationRules : BaseValidationRules
    {
        public CompanyValidationRules CheckName(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                errors.Add("Не указано название");
            }

            if (!string.IsNullOrEmpty(name) && name.Length > 100)
            {
                errors.Add("название должено быть меньше 100 символов ");
            }

            return this;
        }

        public CompanyValidationRules CheckDomainName(string domainName)
        {
            if (string.IsNullOrEmpty(domainName))
            {
                errors.Add("Не указан домен");
            }

            if (!string.IsNullOrEmpty(domainName) && domainName.Length > 100)
            {
                errors.Add("домен должен быть меньше 100 символов ");
            }

            return this;
        }
    }
}
