using JewelleryCatalog.Application.DTOs;

namespace JewelleryCatalog.Application.Email;

public static class InquiryEmailTemplate
{
    public static string Build(CreateInquiryDto dto)
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
        New Product Inquiry
        </h3>

        <hr/>

        <h4>Product Details</h4>

        <table style='width:100%;border-collapse:collapse;'>

        <tr>
        <td style='padding:8px;'><strong>Product</strong></td>
        <td>{dto.ProductName}</td>
        </tr>

        <tr>
        <td style='padding:8px;'><strong>Reference</strong></td>
        <td>#{dto.ProductId}</td>
        </tr>

        </table>

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

        <h4>Customer Message</h4>

        <p style='line-height:1.8;'>

        {dto.Message.Replace(Environment.NewLine, "<br/>")}

        </p>

        </div>

        </body>

        </html>";
    }
}