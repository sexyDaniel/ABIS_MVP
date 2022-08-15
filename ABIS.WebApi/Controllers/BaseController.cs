using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ABIS.WebApi.Controllers;

[ApiController]
public class BaseController : Controller
{
    internal Guid? UserId => User.Identity.IsAuthenticated
        ? Guid.Parse(User.FindFirst(ClaimTypes.Sid).Value)
        : null;
}