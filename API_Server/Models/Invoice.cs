using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
    public class Invoice
    {
        public int Id { get; set; }

        public string Code { get; set; }

        public DateTime IssuedDate { get; set; }

        public string ShippingAddress { get; set; }

        public string ShippingPhone { get; set;}

        [DefaultValue(0)]
        public int Total { get; set;}

        [DefaultValue(1)]
        public int Status { get; set; }

        [ForeignKey("UserId")]
        public string UserId { get; set; }

        public User User { get; set; }

        public int PaymentMethodId { get; set; }

        public PaymentMethod PaymentMethod { get; set; }

        public int DiscountCodeId { get; set; }

        public DiscountCode DiscountCode { get; set; }

        public Invoice()
        {
            Status = 1;
            Total = 0;
        }
    }
}
