using ABIS.Common.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ABIS.Persistence.Configurations
{
    public class TokenConfiguration : IEntityTypeConfiguration<Token>
    {
        public void Configure(EntityTypeBuilder<Token> builder)
        {
            builder.HasKey(t => t.Id);

            builder.Property(t => t.Email)
                .HasMaxLength(200)
                .IsRequired();
            builder.Property(t => t.CompanyId)
                .IsRequired();
            builder.Property(t => t.Role)
                .HasConversion<string>()
                .IsRequired();
        }
    }
}
