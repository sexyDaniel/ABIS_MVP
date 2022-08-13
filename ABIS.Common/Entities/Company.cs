namespace ABIS.Common.Entities;

public class Company
{
    public Company()
    {
        Users = new HashSet<User>();
    }

    public int Id { get; set; }
    public string DomainName { get; set; }
    public string Name { get; set; }

    public ICollection<User> Users { get; set; }
}