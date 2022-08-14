using ABIS.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ABIS.Common.DTOs.ExceptionDTOs
{
    public class ClientErrorResponse
    {
        public string Message { get; set; }
        public ResponseStatusCodes StatusCode { get; set; }
    }
}
