using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ABIS.BusinessLogic.ValidationRules
{
    public abstract class BaseValidationRules
    {
        protected List<string> errors;

        public BaseValidationRules() 
        {
            errors = new List<string>();
        }

        public List<string> GetErrors() => errors;
    }
}
