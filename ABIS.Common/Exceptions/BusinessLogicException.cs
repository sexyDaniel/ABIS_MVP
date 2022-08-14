using ABIS.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ABIS.Common.Exceptions
{
    public class BusinessLogicException : Exception
    {
        public BusinessLogicException(string message) : base(message)
        {

        }

        public readonly ResponseStatusCodes StatusCode = ResponseStatusCodes.BadRequest;
    }
}
