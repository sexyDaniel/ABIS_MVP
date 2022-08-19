using ABIS.BusinessLogic.ValidationRules;
using ABIS.Common.DTOs.RatioQuestionDTOs;
using ABIS.Common.Entities;
using ABIS.Common.Exceptions;
using ABIS.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ABIS.BusinessLogic.Services
{
    public class RatioQuestionsService : IRatioQuestionsService
    {
        private readonly IDbContext _context;
        public RatioQuestionsService(IDbContext context)
        {
            _context = context;
        }

        public async Task CreateRatioQuestionAsync(CreateRatioQuestion createRatioQuestion)
        {
            var errors = new RatioQuestionValidationRules()
                .CheckQuestion(createRatioQuestion.QuestionText)
                .CheckAnswer(createRatioQuestion.AnswerText)
                .GetErrors();

            if (errors.Count > 0) 
            {
                throw new ValidationException(string.Join(' ', errors));
            }

            var isTestItemExists = await _context.TestItems
                .AnyAsync(ti => ti.Id == createRatioQuestion.TestItemId && ti.ItemType == Common.Enums.TestItemTypes.Correlate);

            if (!isTestItemExists) 
            {
                throw new NotFoundException("Такого тестового вопроса нет");
            }

            var ratioQuestion = new RatioQuestion() 
            {
                TestItemId = createRatioQuestion.TestItemId,
                QuestionText = createRatioQuestion.QuestionText,
                RatioAnswer =new RatioAnswer() 
                {
                    TestItemId = createRatioQuestion.TestItemId, 
                    AnswerText = createRatioQuestion.AnswerText
                }
            };

            await _context.RatioQuestions.AddAsync(ratioQuestion);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteRatioQuestionAsync(int testItemId, int ratioQuestionId)
        {
            var question = await _context.RatioQuestions
                .Include(rq => rq.RatioAnswer)
                .SingleOrDefaultAsync(rq => rq.TestItemId == testItemId &&
                rq.Id == ratioQuestionId);

            if (question == null)
            {
                throw new NotFoundException("Такого вопроса на сопоставление нет");
            }

            _context.RatioQuestions.Remove(question);
            _context.RatioAnswers.Remove(question.RatioAnswer);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateRatioQuestioAsync(UpdateRatioQuestionDTO updateRatioQuestionDTO)
        {
            var errors = new RatioQuestionValidationRules()
               .CheckQuestion(updateRatioQuestionDTO.QuestionText)
               .CheckAnswer(updateRatioQuestionDTO.AnswerText)
               .GetErrors();

            if (errors.Count > 0)
            {
                throw new ValidationException(string.Join(' ', errors));
            }

            var question = await _context.RatioQuestions
               .Include(rq => rq.RatioAnswer)
               .SingleOrDefaultAsync(rq => rq.TestItemId == updateRatioQuestionDTO.TestItemId &&
               rq.Id == updateRatioQuestionDTO.RatioQuestionId);

            if (question == null)
            {
                throw new NotFoundException("Такого вопроса на сопоставление нет");
            }

            question.QuestionText = updateRatioQuestionDTO.QuestionText;
            question.RatioAnswer.AnswerText = updateRatioQuestionDTO.AnswerText;

            await _context.SaveChangesAsync();
        }
    }
}
