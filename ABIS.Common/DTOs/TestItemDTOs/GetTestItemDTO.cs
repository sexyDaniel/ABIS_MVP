using ABIS.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ABIS.Common.DTOs.TestItemDTOs
{
    public class GetTestItemDTO
    {
        public int Id { get; set; }
        public string QuestionText { get; set; }
        public string ItemType { get; set; }
    }
}
