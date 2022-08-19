using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ABIS.Common.DTOs.TestItemDTOs
{
    public class GetRatioTestItemDTO : GetTestItemDTO
    {
        public ICollection<GetRatioQuestionDTO> GetRatioQuestions { get; set; }
    }

    public class GetRatioQuestionDTO
    {
        public int QuestionId { get; set; }
        public string QuestionText { get; set; }
        public int AnswerId { get; set; }
        public string AnswerText { get; set; }
    }
}
