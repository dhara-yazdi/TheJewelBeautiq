using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JewelleryCatalog.Application.Email
{
    public class EmailRequest
    {
        public string? To { get; set; } = string.Empty;

        public string Subject { get; set; } = string.Empty;

        public string HtmlBody { get; set; } = string.Empty;

        public string? ReplyTo { get; set; }

        public string? ReplyToName { get; set; }
    }
}
