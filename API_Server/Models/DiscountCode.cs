using System.ComponentModel;

namespace API_Server.Models
{
    public class DiscountCode
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Code { get; set; }

        [DefaultValue(0)]
        public int Quantity { get; set; }

        [DefaultValue(0)]
        public int Percent { get; set; }

        [DefaultValue(true)]
        public bool Status { get; set; }

        public DiscountCode()
        {
            Status = true;
        }
    }
}
