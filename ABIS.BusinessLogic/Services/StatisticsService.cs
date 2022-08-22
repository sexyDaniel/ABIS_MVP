using ABIS.Common.DTOs.StatisticDTOs;
using ABIS.Common.Entities;
using ABIS.Common.Enums;
using ABIS.Common.Exceptions;
using ABIS.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ABIS.BusinessLogic.Services
{
    public class StatisticsService : IStatisticsService
    {
        private readonly IDbContext _context;

        public StatisticsService(IDbContext context)
        {
            _context = context;
        }

        public async Task CheckCorrelateAnswerTypeAsync(CheckCorrelateTypeDTO checkCorrelateTypeDTO, Guid? userId)
        {
            var testItem = await _context.TestItems
                .Include(ti => ti.RatioQuestions)
                .SingleOrDefaultAsync(ti => ti.ItemType == TestItemTypes.Correlate &&
                ti.TestUnitId == checkCorrelateTypeDTO.TestUnitId &&
                ti.Id == checkCorrelateTypeDTO.TestItemId);

            if (testItem == null)
            {
                throw new NotFoundException("Вопрос не найден");
            }

            var testStat = await _context.TestStatistics
                .SingleOrDefaultAsync(ts => ts.TestUnitId == checkCorrelateTypeDTO.TestUnitId &&
                ts.TestItemId == checkCorrelateTypeDTO.TestItemId &&
                ts.UserId == userId);

            var isRight = true;
            foreach (var q in testItem.RatioQuestions) 
            {
                var answer = checkCorrelateTypeDTO.Answers.FirstOrDefault(a => a.RatioQuestionId == q.Id);
                if (answer == null || answer.RatioAnswerId != q.RightAnswerId) 
                {
                    isRight = false;
                    break;
                }
            }

            if (testStat != null)
            {
                testStat.IsRight = isRight;
                testStat.CreateDate = DateTime.UtcNow;
            }
            else
            {
                testStat = new TestStatistic()
                {
                    UserId = userId.Value,
                    TestUnitId = checkCorrelateTypeDTO.TestUnitId,
                    TestItemId = checkCorrelateTypeDTO.TestItemId,
                    IsRight = isRight
                };

                await _context.TestStatistics.AddAsync(testStat);
            }

            await _context.SaveChangesAsync();
        }

        public async Task CheckMultipleAnswerTypeAsync(CheckMultipleAnswerTypeDTO multipleAnswerTypeDTO, Guid? userId)
        {
            var testItem = await _context.TestItems
                .Include(ti => ti.Answers.Where(a => a.isRight))
                .SingleOrDefaultAsync(ti => ti.ItemType == TestItemTypes.MultipleAnswers &&
                ti.TestUnitId == multipleAnswerTypeDTO.TestUnitId &&
                ti.Id == multipleAnswerTypeDTO.TestItemId);

            if (testItem == null)
            {
                throw new NotFoundException("Вопрос не найден");
            }

            var testStat = await _context.TestStatistics
                .SingleOrDefaultAsync(ts => ts.TestUnitId == multipleAnswerTypeDTO.TestUnitId &&
                ts.TestItemId == multipleAnswerTypeDTO.TestItemId &&
                ts.UserId == userId);

            var isRight = testItem.Answers
                .Select(a => multipleAnswerTypeDTO.Answers.Contains(a.Id))
                .Count(a => a) == testItem.Answers.Count;

            if (testStat != null)
            {
                testStat.IsRight = isRight;
                testStat.CreateDate = DateTime.UtcNow;
            }
            else
            {
                testStat = new TestStatistic()
                {
                    UserId = userId.Value,
                    TestUnitId = multipleAnswerTypeDTO.TestUnitId,
                    TestItemId = multipleAnswerTypeDTO.TestItemId,
                    IsRight = isRight
                };

                await _context.TestStatistics.AddAsync(testStat);
            }

            await _context.SaveChangesAsync();
        }

        public async Task CheckOneAnswerTypeAsync(CheckOneAnswerTypeDTO oneAnswerTypeDTO, Guid? userId)
        {
            var testItem = await _context.TestItems
                .Include(ti => ti.Answers)
                .SingleOrDefaultAsync(ti => ti.ItemType == TestItemTypes.OneAnswer &&
                ti.TestUnitId == oneAnswerTypeDTO.TestUnitId &&
                ti.Id == oneAnswerTypeDTO.TestItemId);

            if (testItem == null) 
            {
                throw new NotFoundException("Вопрос не найден");
            }

            var testStat = await _context.TestStatistics
                .SingleOrDefaultAsync(ts => ts.TestUnitId == oneAnswerTypeDTO.TestUnitId &&
                ts.TestItemId == oneAnswerTypeDTO.TestItemId &&
                ts.UserId == userId);

            if (testStat != null)
            {
                testStat.IsRight = testItem.Answers.Any(a => a.Id == oneAnswerTypeDTO.AnswerId && a.isRight);
                testStat.CreateDate = DateTime.UtcNow;
            }
            else 
            {
                testStat = new TestStatistic()
                {
                    UserId = userId.Value,
                    TestUnitId = oneAnswerTypeDTO.TestUnitId,
                    TestItemId = oneAnswerTypeDTO.TestItemId,
                    IsRight = testItem.Answers.Any(a => a.Id == oneAnswerTypeDTO.AnswerId && a.isRight)
                };

                await _context.TestStatistics.AddAsync(testStat);
            }

            await _context.SaveChangesAsync();
        }

        public async Task CheckOpenAnswerTypeAsync(CheckOpenAnswerTypeDTO openAnswerTypeDTO, Guid? userId)
        {
            var testItem = await _context.TestItems
                .Include(ti => ti.Answers)
                .SingleOrDefaultAsync(ti => ti.ItemType == TestItemTypes.OpenAnswer &&
                ti.TestUnitId == openAnswerTypeDTO.TestUnitId &&
                ti.Id == openAnswerTypeDTO.TestItemId);

            if (testItem == null)
            {
                throw new NotFoundException("Вопрос не найден");
            }

            var testStat = await _context.TestStatistics
                .SingleOrDefaultAsync(ts => ts.TestUnitId == openAnswerTypeDTO.TestUnitId &&
                ts.TestItemId == openAnswerTypeDTO.TestItemId &&
                ts.UserId == userId);

            if (testStat != null)
            {
                testStat.IsRight = testItem.Answers.Any(a => a.AnswerText.ToLower() == openAnswerTypeDTO.AnswerText.ToLower());
                testStat.CreateDate = DateTime.UtcNow;
            }
            else
            {
                testStat = new TestStatistic()
                {
                    UserId = userId.Value,
                    TestUnitId = openAnswerTypeDTO.TestUnitId,
                    TestItemId = openAnswerTypeDTO.TestItemId,
                    IsRight = testItem.Answers.Any(a => a.AnswerText.ToLower() == openAnswerTypeDTO.AnswerText.ToLower())
            };

                await _context.TestStatistics.AddAsync(testStat);
            }

            await _context.SaveChangesAsync();
        }

        public async Task<GetUnitResultByUser> GetUnitResultByUserAsync(int testUnitId, Guid? userId)
        {
            var unitResult = await _context.TestStatistics
               .Where(ts => ts.UserId == userId && ts.TestUnitId == testUnitId)
               .Select(ts => new { ts.IsRight })
               .ToListAsync();

            return new GetUnitResultByUser()
            {
                QuestionCount = unitResult.Count,
                CorrectAnswerCount = unitResult.Where(ur => ur.IsRight).Count()
            };
        }
    }
}
