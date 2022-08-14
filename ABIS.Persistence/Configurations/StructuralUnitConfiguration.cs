using ABIS.Common.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ABIS.Persistence.Configurations;

public class StructuralUnitConfiguration : IEntityTypeConfiguration<StructuralUnit>
{
    public void Configure(EntityTypeBuilder<StructuralUnit> builder)
    {
        builder.HasKey(u => u.Id);

        builder.Property(u => u.Number)
            .IsRequired();
        builder.Property(u => u.Title)
            .HasMaxLength(200)
            .IsRequired();

        builder.HasOne(u => u.CourseSubItem)
            .WithMany(csi => csi.StructuralUnits)
            .HasForeignKey(u => u.CourseSubItemId)
            .IsRequired();

        builder.HasIndex(u => u.Title)
           .IsUnique();
    }
}