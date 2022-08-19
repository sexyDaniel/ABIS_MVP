using ABIS.Common.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ABIS.Common.DTOs.TestItemDTOs
{
    public class CreateBaseTestItemDTO
    {
        public int TestUnitId { get; set; }
        public string QuestionText { get; set; }
        public TestItemTypes ItemType { get; set; }
    }
}
