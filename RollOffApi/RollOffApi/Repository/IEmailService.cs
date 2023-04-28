using RollOffApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RollOffApi.Repository
{
    public interface IEmailService
    {
       public void SendEmail(EmailModel emailModel);
    }
}
