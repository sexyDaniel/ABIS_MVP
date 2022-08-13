using ABIS.Common.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ABIS.Persistence.Configurations;

public class RatioQuestionConfiguration : IEntityTypeConfiguration<RatioQuestion>
{
    public void Configure(EntityTypeBuilder<RatioQuestion> builder)
    {
        builder.HasKey(rq => rq.Id);

        builder.Property(rq => rq.QuestionText)
            .HasMaxLength(200)
            .IsRequired();

        builder.HasOne(rq => rq.TestItem)
            .WithMany(ti => ti.RatioQuestions)
            .HasForeignKey(rq => rq.TestItemId)
            .IsRequired();
        
        builder.HasOne(rq => rq.RatioAnswer)
            .WithOne(ra => ra.RatioQuestion)
            .HasForeignKey<RatioQuestion>(ra => ra.RightAnswerId)
            .IsRequired();
    }
}