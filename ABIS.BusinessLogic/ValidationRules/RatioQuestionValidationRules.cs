using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ABIS.BusinessLogic.ValidationRules
{
    internal class RatioQuestionValidationRules : BaseValidationRules
    {
        public RatioQuestionValidationRules CheckQuestion(string text)
        {

            if (string.IsNullOrEmpty(text) || text.Length > 200)
            {
                errors.Add("Передан некорректный вопрос (пустая строка или превышение 200 символов)");
            }

            return this;
        }
        public RatioQuestionValidationRules CheckAnswer(string text)
        {

            if (string.IsNullOrEmpty(text) || text.Length > 200)
            {
                errors.Add("Передан некорректный ответ (пустая строка или превышение 200 символов)");
            }

            return this;
        }
    }
}
