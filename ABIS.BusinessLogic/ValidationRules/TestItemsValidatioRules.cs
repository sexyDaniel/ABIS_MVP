using ABIS.Common.DTOs.AnswerDTOs;
using ABIS.Common.DTOs.TestItemDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ABIS.BusinessLogic.ValidationRules
{
    public class TestItemsValidatioRules : BaseValidationRules
    {
        public TestItemsValidatioRules CheckQuestionText(string questionText)
        {
            if (string.IsNullOrEmpty(questionText))
            {
                errors.Add("Вопрос не введен");
            }

            if (!string.IsNullOrEmpty(questionText) && questionText.Length > 400)
            {
                errors.Add("Максимальная длина вопроса 400");
            }

            return this;
        }

        public TestItemsValidatioRules CheckAnswers(ICollection<CreateAnswerDTO> answerDTOs)
        {
            foreach(var a in answerDTOs) 
            {
                if (string.IsNullOrEmpty(a.AnswerText) || a.AnswerText.Length > 200) 
                {
                    errors.Add("Переданы некорректные ответы (пустая строка или превышение 200 символов)");
                    break;
                }
            }

            return this;
        }

        public TestItemsValidatioRules CheckRatioItem(ICollection<CreateRatioQuestionDTO> answerDTOs)
        {
            foreach (var a in answerDTOs)
            {
                if (string.IsNullOrEmpty(a.QuestionText) || 
                    string.IsNullOrEmpty(a.RightAnswerText) ||
                    a.QuestionText.Length>200 ||
                    a.RightAnswerText.Length > 200)
                {
                    errors.Add("Переданы некорректные ответы (пустая строка или превышение 200 символов)");
                    break;
                }
            }

            return this;
        }
    }
}
