
namespace ABIS.BusinessLogic.ValidationRules
{
    public class AuthValidationRules : BaseValidationRules
    {
        public AuthValidationRules() : base() { }

        public AuthValidationRules CheckEmail(string email) 
        {
            if (string.IsNullOrEmpty(email)) 
            {
                errors.Add("Email не введен");
            }

            if (!string.IsNullOrEmpty(email) && email.Length > 100) 
            {
                errors.Add("Максимальная длина Email 100");
            }

            return this;
        }

        public AuthValidationRules CheckPassword(string password)
        {
            if (string.IsNullOrEmpty(password))
            {
                errors.Add("password не введен");
            }

            return this;
        }

        public AuthValidationRules CheckFirstName(string firstName, int length)
        {
            if (string.IsNullOrEmpty(firstName))
            {
                errors.Add("Имя не введено");
            }

            if (!string.IsNullOrEmpty(firstName) && firstName.Length > length)
            {
                errors.Add($"Максимальная длина имени {length}");
            }

            return this;
        }

        public AuthValidationRules CheckLastName(string lastName, int length)
        {
            if (string.IsNullOrEmpty(lastName))
            {
                errors.Add("Имя не введено");
            }

            if (!string.IsNullOrEmpty(lastName) && lastName.Length > length)
            {
                errors.Add($"Максимальная длина фамилии {length}");
            }

            return this;
        }
    }
}
