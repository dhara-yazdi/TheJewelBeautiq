using JewelleryCatalog.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JewelleryCatalog.Application.Email
{
    public static class ContactIEmailTemplate
    {
        public static string BuildContactInquiry(CreateInquiryDto dto)
        {
            return $@"
                    <!DOCTYPE html>
                    <html>
                    <head>
                    <meta charset='UTF-8'>
                    </head>

                    <body style='font-family:Segoe UI,Arial,sans-serif;background:#f5f5f5;padding:30px;'>

                    <div style='max-width:700px;margin:auto;background:#ffffff;border-radius:10px;padding:35px;'>

                    <h2 style='color:#C6A769;margin-top:0;'>
                    The Jewel BeautiQ
                    </h2>

                    <h3>
                    New Contact Us Inquiry
                    </h3>

                    <hr/>

                    <h4>Customer Details</h4>

                    <table style='width:100%;border-collapse:collapse;'>

                    <tr>
                    <td style='padding:8px;'><strong>Name</strong></td>
                    <td>{dto.Name}</td>
                    </tr>

                    <tr>
                    <td style='padding:8px;'><strong>Email</strong></td>
                    <td>{dto.Email}</td>
                    </tr>

                    <tr>
                    <td style='padding:8px;'><strong>Phone</strong></td>
                    <td>{dto.Phone}</td>
                    </tr>

                    </table>

                    <hr/>

                    <h4>Message</h4>

                    <p style='line-height:1.8;'>
                    {dto.Message.Replace(Environment.NewLine, "<br/>")}
                    </p>

                    <hr/>

                    <p style='font-size:13px;color:#777;'>
                    This inquiry was submitted through the Contact Us page.
                    </p>

                    </div>

                    </body>
                    </html>";
        }
    }
}
