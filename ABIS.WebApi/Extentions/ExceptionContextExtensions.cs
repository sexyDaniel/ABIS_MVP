using ABIS.Common.DTOs.ExceptionDTOs;
using ABIS.Common.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace ABIS.WebApi.Extentions
{
    public static class ExceptionContextExtensions
    {
        public static void SendClientException(this ExceptionContext context, ResponseStatusCodes statusCode, string message)
        {
            var response = new ClientErrorResponse
            {
                Message = message,
                StatusCode = statusCode
            };

            context.HttpContext.Response.StatusCode = (int)statusCode;
            context.Result = new JsonResult(response);
        }

        public static void SendServerException(this ExceptionContext context)
        {
            var response = new ServerErrorResponse
            {
                Message = context.Exception.Message,
                StatusCode = ResponseStatusCodes.ServerError,
                StackTrace = context.Exception.StackTrace
            };

            context.HttpContext.Response.StatusCode = (int)ResponseStatusCodes.ServerError;
            context.Result = new JsonResult(response);
        }
    }
}
