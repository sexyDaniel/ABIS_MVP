using ABIS.Common.Enums;

namespace ABIS.Common.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException(string message) :base(message)
        {

        }

        public readonly ResponseStatusCodes StatusCode = ResponseStatusCodes.NotFound;
    }
}
