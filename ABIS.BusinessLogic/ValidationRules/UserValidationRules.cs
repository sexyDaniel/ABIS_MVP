using ABIS.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ABIS.BusinessLogic.ValidationRules
{
    public class UserValidationRules : BaseValidationRules
    {
        public UserValidationRules CheckRole(Roles role)
        {
            if (role == Roles.SuperAdmin && role == Roles.None)
            {
                errors.Add("Такой роли нет");
            }

            return this;
        }

        public UserValidationRules CheckPasswordSavedLink(string link)
        {
            if (string.IsNullOrEmpty(link))
            {
                errors.Add("Не указана ссылка для установки пароля");
            }

            return this;
        }

        public UserValidationRules CheckEmails(ICollection<string> emails)
        {
            foreach (var e in emails) 
            {
                if (string.IsNullOrEmpty(e)) 
                {
                    errors.Add("Пустой Email");
                    break;
                }
            }

            return this;
        }


    }
}
