using ABIS.Common.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ABIS.Persistence.Configurations;

public class CourseSubItemConfiguration : IEntityTypeConfiguration<CourseSubItem>
{
    public void Configure(EntityTypeBuilder<CourseSubItem> builder)
    {
        builder.HasKey(csi => csi.Id);

        builder.Property(csi => csi.Number)
            .IsRequired();
        builder.Property(csi => csi.Title)
            .HasMaxLength(300)
            .IsRequired();

        builder.HasOne(csi => csi.Course)
            .WithMany(c => c.CourseSubItem)
            .HasForeignKey(csi => csi.CourseId)
            .IsRequired();
    }
}