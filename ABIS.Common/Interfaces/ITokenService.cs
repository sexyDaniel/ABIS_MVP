using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ABIS.Common.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreatePasswordToken(string email);
        Task DeletePasswordToken(string email);
    }
}
