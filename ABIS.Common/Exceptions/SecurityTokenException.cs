using ABIS.Common.Enums;

namespace ABIS.Common.Exceptions
{
    public class SecurityTokenException : Exception
    {
        public SecurityTokenException(string message) : base(message)
        {

        }

        public readonly ResponseStatusCodes StatusCode = ResponseStatusCodes.Unauthorized;
    }
}
