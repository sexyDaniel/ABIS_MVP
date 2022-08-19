using ABIS.BusinessLogic.ValidationRules;
using ABIS.Common.DTOs.TestItemDTOs;
using ABIS.Common.Entities;
using ABIS.Common.Enums;
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

        public async Task<AnswerForCreateDTO> CreateRatioTestItemAsync(CreateRatioTestitemDTO ratioTestitemDTO)
        {
            var errors = new TestItemsValidatioRules()
                .CheckQuestionText(ratioTestitemDTO.QuestionText)
                .CheckRatioItem(ratioTestitemDTO.RatioQuestions)
                .GetErrors();

            if (errors.Count > 0)
            {
                throw new ValidationException(string.Join(' ', errors));
            }

            var testUnit = await _context.TestUnits
               .SingleOrDefaultAsync(tu => tu.Id == ratioTestitemDTO.TestUnitId);

            if (testUnit == null)
            {
                throw new NotFoundException("Тестовый юнит не найден");
            }

            var testItem = new TestItem()
            {
                QuestionText = ratioTestitemDTO.QuestionText,
                ItemType = TestItemTypes.Correlate,
                Number = 1,
                TestUnitId = ratioTestitemDTO.TestUnitId,
            };

            var ratioQuestions = ratioTestitemDTO.RatioQuestions
                .Select(rq => new RatioQuestion()
                {
                    TestItem = testItem,
                    QuestionText = rq.QuestionText,
                    RatioAnswer = new RatioAnswer() { AnswerText = rq.RightAnswerText, TestItem = testItem }
                });
            testItem.RatioQuestions.AddRange(ratioQuestions);

            await _context.TestItems.AddAsync(testItem);
            await _context.SaveChangesAsync();

            return new AnswerForCreateDTO() { Id = testItem.Id };
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

        public async Task DeleteTestItemAsync(int testItemId)
        {
            var testItem = await _context.TestItems
                .SingleOrDefaultAsync(ti => ti.Id == testItemId);

            if (testItem == null)
            {
                throw new NotFoundException("Тестовый вопрос не найден");
            }

            _context.TestItems.Remove(testItem);
            await _context.SaveChangesAsync();
        }

        public async Task<ICollection<GetTestItemDTO>> GetTestItemsAsync(int testUnitId)
        {
            IEnumerable<GetTestItemDTO> ratioTestItems = await _context.TestItems
                .Include(ti => ti.RatioQuestions)
                .Where(ti => ti.TestUnitId == testUnitId && ti.ItemType == TestItemTypes.Correlate)
                .Select(ti => new GetRatioTestItemDTO()
                {
                    Id = ti.Id,
                    QuestionText = ti.QuestionText,
                    ItemType = ti.ItemType.ToString(),
                    GetRatioQuestions = ti.RatioQuestions.Select(rq => new GetRatioQuestionDTO()
                    {
                        QuestionId = rq.Id,
                        QuestionText = rq.QuestionText,
                        AnswerId = rq.RightAnswerId,
                        AnswerText = rq.RatioAnswer.AnswerText
                    }).ToList()
                }).ToListAsync();

            IEnumerable<GetTestItemDTO> testItems = await _context.TestItems
                .Include(ti => ti.Answers)
                .Where(ti => ti.TestUnitId == testUnitId && ti.ItemType != TestItemTypes.Correlate)
                .Select(ti => new GetAnotherTestItemDTO()
                {
                    Id = ti.Id,
                    QuestionText = ti.QuestionText,
                    ItemType = ti.ItemType.ToString(),
                    Answers = ti.Answers.Select(a => new GetAnswerDTO()
                    {
                        Id = a.Id,
                        Text = a.AnswerText,
                        IsRight = a.isRight
                    }).ToList()
                }).ToListAsync();

            return ratioTestItems.Union(testItems).ToList();
        }

        public async Task UpdateTestItemAsync(UpdateTestItemDTO updateTestItem)
        {
            var errors = new TestItemsValidatioRules()
               .CheckQuestionText(updateTestItem.QuestionText)
               .GetErrors();

            if (errors.Count > 0)
            {
                throw new ValidationException(string.Join(' ', errors));
            }

            var testUnit = await _context.TestItems
                .SingleOrDefaultAsync(tu => tu.Id == updateTestItem.Id);

            if (testUnit == null)
            {
                throw new NotFoundException("Тестовый вопрос не найден");
            }

            testUnit.QuestionText = updateTestItem.QuestionText;

            await _context.SaveChangesAsync();
        }
    }
}
