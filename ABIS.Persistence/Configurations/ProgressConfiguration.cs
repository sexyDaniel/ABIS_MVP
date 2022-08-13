using ABIS.Common.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ABIS.Persistence.Configurations;

public class ProgressConfiguration : IEntityTypeConfiguration<Progress>
{
    public void Configure(EntityTypeBuilder<Progress> builder)
    {
        builder.HasKey(p => p.Id);
        
        builder.HasOne(p => p.User)
            .WithMany(u => u.Progresses)
            .HasForeignKey(p => p.UserId)
            .IsRequired();
        
        builder.HasOne(p => p.Course)
            .WithMany(c => c.Progresses)
            .HasForeignKey(p => p.CourseId)
            .IsRequired();
        
        builder.HasOne(p => p.StructuralUnit)
            .WithMany(su => su.Progresses)
            .HasForeignKey(p => p.StructuralUnitId)
            .IsRequired();
    }
}