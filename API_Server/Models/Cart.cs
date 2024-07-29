using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
    public class Cart
    {
        public int Id { get; set; }

        [DefaultValue(1)]
        public int Quantity { get; set; }

        [DefaultValue(true)]
        public bool Status { get; set; }

        [ForeignKey("UserId")]
        public string UserId { get; set; }

        public User User { get; set; }

        public int PhoneId { get; set; }

        public Phone Phone { get; set; }

        public Cart()
        {
            Status = true;
            Quantity = 1;
        }
    }
}
