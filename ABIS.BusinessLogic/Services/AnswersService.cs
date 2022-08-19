using ABIS.BusinessLogic.ValidationRules;
using ABIS.Common.DTOs.AnswerDTOs;
using ABIS.Common.Entities;
using ABIS.Common.Exceptions;
using ABIS.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ABIS.BusinessLogic.Services
{
    public class AnswersService : IAnswerService
    {
        private readonly IDbContext _context;
        public AnswersService(IDbContext context)
        {
            _context = context;
        }

        public async Task CreateAnswerAsync(CreateSingleAnswerDTO createSingleAnswerDTO)
        {
            var errors = new AnswerValidationRules()
                .CheckAnswer(createSingleAnswerDTO.AnswerText)
                .GetErrors();

            if (errors.Count > 0) 
            {
                throw new ValidationException(string.Join(" ", errors));
            }

            var isTestItemExists = await _context.TestItems
                .AnyAsync(ti => ti.Id == createSingleAnswerDTO.TestItemId);

            if (!isTestItemExists) 
            {
                throw new NotFoundException("Тестовый вопрос не найден");
            }

            var answer = new Answer()
            {
                TestItemId = createSingleAnswerDTO.TestItemId,
                isRight = createSingleAnswerDTO.isRight,
                AnswerText = createSingleAnswerDTO.AnswerText
            };

            await _context.Answers.AddAsync(answer);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAnswerAsync(int answerId, int testItemId)
        {
            var answer = await _context.Answers
                .SingleOrDefaultAsync(a => a.Id == answerId && a.TestItemId == testItemId);

            if (answer == null) 
            {
                throw new NotFoundException("Ответ не найден");
            }

            _context.Answers.Remove(answer);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAnswerAsync(UpdateAnswerDTO updateAnswerDTO)
        {
            var errors = new AnswerValidationRules()
                .CheckAnswer(updateAnswerDTO.AnswerText)
                .GetErrors();

            if (errors.Count > 0)
            {
                throw new ValidationException(string.Join(" ", errors));
            }

            var isTestItemExists = await _context.TestItems
                .AnyAsync(ti => ti.Id == updateAnswerDTO.TestItemId);

            if (!isTestItemExists)
            {
                throw new NotFoundException("Тестовый вопрос не найден");
            }

            var answer = await _context.Answers
               .SingleOrDefaultAsync(a => a.Id == updateAnswerDTO.AnswerId && a.TestItemId == updateAnswerDTO.TestItemId);

            if (answer == null)
            {
                throw new NotFoundException("Ответ не найден");
            }

            answer.isRight = updateAnswerDTO.IsRight;
            answer.AnswerText = updateAnswerDTO.AnswerText;

            await _context.SaveChangesAsync();
        }
    }
}
