using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ABIS.Common.Entities
{
    public class CourseUser
    {
        public int CoursesId { get; set; }
        public Course Courses { get; set; }
        public Guid UsersId { get; set; }
        public User Users { get; set; }
    }
}
