using System.ComponentModel;

namespace API_Server.Models
{
    public class InvoiceDetail
    {
        public int Id { get; set; }

        [DefaultValue(1)]
        public int Quantity { get; set; }

        [DefaultValue(0)]
        public int UnitPrice { get; set; }

        [DefaultValue(true)]
        public bool Status { get; set; }

        public int InvoiceId { get; set; }

        public Invoice Invoice { get; set; }

        public int PhoneId { get; set; }

        public Phone Phone { get; set; }

        public InvoiceDetail()
        {
            Status = true;
            Quantity = 1;
            UnitPrice = 0;
        }
    }
}
