using ABIS.BusinessLogic.ValidationRules;
using ABIS.Common.DTOs.TestItemDTOs;
using ABIS.Common.Entities;
using ABIS.Common.Exceptions;
using ABIS.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ABIS.BusinessLogic.Services
{
    public class TestItemsService : ITestItemService
    {
        private readonly IDbContext _context;

        public TestItemsService(IDbContext context)
        {
            _context = context;
        }

        public Task<AnswerForCreateDTO> CreateRatioTestItemAsync(CreateRatioTestitemDTO ratioTestitemDTO)
        {
            throw new NotImplementedException();
        }

        public async Task<AnswerForCreateDTO> CreateTestItemAsync(CreateTestItemDTO testItemDTO)
        {
            var errors = new TestItemsValidatioRules()
                .CheckQuestionText(testItemDTO.QuestionText)
                .CheckAnswers(testItemDTO.AnswerDTOs)
                .GetErrors();

            if (errors.Count > 0) 
            {
                throw new ValidationException(string.Join(' ', errors));
            }

            var testUnit = await _context.TestUnits
                .SingleOrDefaultAsync(tu => tu.Id == testItemDTO.TestUnitId);

            if (testUnit == null) 
            {
                throw new NotFoundException("Тестовый юнит не найден");
            }

            var answers = testItemDTO.AnswerDTOs
                .Select(a => new Answer()
                {
                    AnswerText = a.AnswerText,
                    isRight = a.isRight
                });

            var testItem = new TestItem()
            {
                QuestionText = testItemDTO.QuestionText,
                ItemType = testItemDTO.ItemType,
                Number = 1,
                TestUnitId = testItemDTO.TestUnitId,
            };
            testItem.Answers.AddRange(answers);

            await _context.TestItems.AddAsync(testItem);
            await _context.SaveChangesAsync();

            return new AnswerForCreateDTO() { Id = testItem.Id };
        }

        public Task DeleteTestItemAsync(int testItemId)
        {
            throw new NotImplementedException();
        }

        public Task GetTestItemAsync()
        {
            throw new NotImplementedException();
        }

        public Task UpdateTestItemAsync()
        {
            throw new NotImplementedException();
        }
    }
}
