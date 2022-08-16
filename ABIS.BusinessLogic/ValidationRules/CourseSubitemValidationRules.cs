using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ABIS.BusinessLogic.ValidationRules
{
    internal class CourseSubitemValidationRules : BaseValidationRules
    {
        public CourseSubitemValidationRules CheckTitle(string title)
        {
            if (string.IsNullOrEmpty(title))
            {
                errors.Add("Не указан title");
            }

            if (!string.IsNullOrEmpty(title) && title.Length > 300)
            {
                errors.Add("title должен быть ментше 300 символов ");
            }

            return this;
        }

        public CourseSubitemValidationRules CheckNumber(int number)
        {
            if (number <= 0)
            {
                errors.Add("Номер ментше 0");
            }

            return this;
        }
    }
}
