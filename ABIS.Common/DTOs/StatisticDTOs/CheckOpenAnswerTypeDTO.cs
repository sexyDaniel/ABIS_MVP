using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ABIS.Common.DTOs.StatisticDTOs
{
    public class CheckOpenAnswerTypeDTO
    {
        public int TestUnitId { get; set; }
        public int TestItemId { get; set; }
        public string AnswerText { get; set; }
    }
}
