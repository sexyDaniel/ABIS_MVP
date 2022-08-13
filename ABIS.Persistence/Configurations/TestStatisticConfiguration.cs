using ABIS.Common.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ABIS.Persistence.Configurations;

public class TestStatisticConfiguration : IEntityTypeConfiguration<TestStatistic>
{
    public void Configure(EntityTypeBuilder<TestStatistic> builder)
    {
        builder.HasKey(ts => ts.Id);
        
        builder.HasOne(ts => ts.User)
            .WithMany(u => u.TestStatistics)
            .HasForeignKey(ts => ts.UserId)
            .IsRequired();
        
        builder.HasOne(ts => ts.TestItem)
            .WithMany(ti => ti.TestStatistics)
            .HasForeignKey(ts => ts.TestItemId)
            .IsRequired();
    }
}