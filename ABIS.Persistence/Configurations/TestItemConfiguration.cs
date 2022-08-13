using ABIS.Common.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ABIS.Persistence.Configurations;

public class TestItemConfiguration : IEntityTypeConfiguration<TestItem>
{
    public void Configure(EntityTypeBuilder<TestItem> builder)
    {
        builder.HasKey(ti => ti.Id);

        builder.Property(ti => ti.Number)
            .IsRequired();
        builder.Property(ti => ti.QuestionText)
            .HasMaxLength(400)
            .IsRequired();
        
        builder.Property(p=>p.ItemType)
            .HasConversion<string>();

        builder.HasOne(ti => ti.TestUnit)
            .WithMany(tu => tu.TestItems)
            .HasForeignKey(ti => ti.TestUnitId)
            .IsRequired();
    }
}