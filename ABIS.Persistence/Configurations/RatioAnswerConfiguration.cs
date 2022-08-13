using ABIS.Common.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ABIS.Persistence.Configurations;

public class RatioAnswerConfiguration : IEntityTypeConfiguration<RatioAnswer>
{
    public void Configure(EntityTypeBuilder<RatioAnswer> builder)
    {
        builder.HasKey(ra => ra.Id);
        
        builder.Property(rq => rq.AnswerText)
            .HasMaxLength(200)
            .IsRequired();
        
        builder.HasOne(ra => ra.TestItem)
            .WithMany(ti => ti.RatioAnswers)
            .HasForeignKey(ra => ra.TestItemId)
            .IsRequired();
    }
}