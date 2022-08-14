using ABIS.Common.Enums;

namespace ABIS.Common.Exceptions
{
    public class UnauthorizedException : Exception
    {
        public UnauthorizedException(string message) : base(message)
        {

        }

        public readonly ResponseStatusCodes StatusCode = ResponseStatusCodes.NotFound;
    }
}
