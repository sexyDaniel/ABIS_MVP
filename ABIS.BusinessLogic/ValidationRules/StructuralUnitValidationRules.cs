
namespace ABIS.BusinessLogic.ValidationRules
{
    internal class StructuralUnitValidationRules : BaseValidationRules
    {
        public StructuralUnitValidationRules CheckTitle(string title)
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

        public StructuralUnitValidationRules CheckNumber(int number)
        {
            if (number <= 0)
            {
                errors.Add("Номер меньше 0");
            }

            return this;
        }
    }
}
