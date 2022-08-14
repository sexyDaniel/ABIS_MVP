using ABIS.Common.Exceptions;
using ABIS.WebApi.Extentions;
using Microsoft.AspNetCore.Mvc.Filters;

namespace ABIS.WebApi.Filters
{
    public class GlobalExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            switch (context.Exception)
            {
                case ValidationException exception:
                    {
                        context.SendClientException(exception.StatusCode, exception.Message);
                        break;
                    }

                case NotFoundException exception:
                    {
                        context.SendClientException(exception.StatusCode, exception.Message);
                        break;
                    }

                case BusinessLogicException exception:
                    {
                        context.SendClientException(exception.StatusCode, exception.Message);
                        break;
                    }

                case UnauthorizedException exception:
                    {
                        context.SendClientException(exception.StatusCode, exception.Message);
                        break;
                    }

                case SecurityTokenException exception:
                    {
                        context.SendClientException(exception.StatusCode, exception.Message);
                        break;
                    }

                default:
                    {
                        context.SendServerException();
                        break;
                    }
            }
        }
    }
}
