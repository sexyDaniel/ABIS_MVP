
namespace ABIS.BusinessLogic.ValidationRules
{
    public class AnswerValidationRules : BaseValidationRules
    {
        public AnswerValidationRules CheckAnswer(string text)
        {

            if (string.IsNullOrEmpty(text) || text.Length > 200)
            {
                errors.Add("Передан некорректный ответ (пустая строка или превышение 200 символов)");
            }

            return this;
        }
    }
}
