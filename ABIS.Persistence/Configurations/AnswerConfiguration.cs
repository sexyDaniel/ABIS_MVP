using ABIS.Common.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ABIS.Persistence.Configurations;

public class AnswerConfiguration : IEntityTypeConfiguration<Answer>
{
    public void Configure(EntityTypeBuilder<Answer> builder)
    {
        builder.HasKey(a => a.Id);

        builder.Property(a => a.AnswerText)
            .HasMaxLength(200)
            .IsRequired();

        builder.HasOne(a => a.TestItem)
            .WithMany(ti => ti.Answers)
            .HasForeignKey(a => a.TestItemId)
            .IsRequired();
    }
}