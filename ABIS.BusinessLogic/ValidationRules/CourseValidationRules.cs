using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ABIS.BusinessLogic.ValidationRules
{
    internal class CourseValidationRules : BaseValidationRules
    {
        public CourseValidationRules CheckTitle(string title) 
        {
            if (string.IsNullOrEmpty(title)) 
            {
                errors.Add("Не указан title");
            }

            if (!string.IsNullOrEmpty(title) && title.Length > 200) 
            {
                errors.Add("title должен быть ментше 200 символов ");
            }

            return this;
        }

        public CourseValidationRules CheckDiscription(string discription)
        {
            if (string.IsNullOrEmpty(discription))
            {
                errors.Add("Не указано описание");
            }

            return this;
        }
    }
}
