using System;
using System.Text;
using System.Web.UI;

namespace ConvertStringToJson
{
    /// <summary>
    /// Halaman utama JSON Formatter dan Escape Converter.
    /// Pengolahan editor dan konversi tetap berjalan di browser melalui JavaScript.
    /// </summary>
    public partial class Default : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // Pastikan response HTML dikirim menggunakan UTF-8.
            Response.ContentEncoding = Encoding.UTF8;
            Response.Charset = "utf-8";
        }
    }
}
