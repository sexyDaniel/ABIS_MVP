using ABIS.Common.Enums;

namespace ABIS.Common.Entities
{
    public  class Token
    {
        public int Id { get; set; }
        public string Value { get; set; }
        public string Email { get; set; }
        public int CompanyId { get; set; }
        public Roles Role { get; set; }
    }
}
