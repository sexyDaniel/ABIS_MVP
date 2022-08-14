using ABIS.Common.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ABIS.Persistence.Configurations;

public class CourseConfiguration : IEntityTypeConfiguration<Course>
{
    public void Configure(EntityTypeBuilder<Course> builder)
    {
        builder.HasKey(c => c.Id);

        builder.Property(c => c.Title)
            .HasMaxLength(200)
            .IsRequired();
        builder.Property(c => c.Discription)
            .IsRequired();

        builder.HasIndex(c => c.Title)
            .IsUnique();

        builder.Property(p => p.CourseStatus)
           .HasConversion<string>();
    }
}