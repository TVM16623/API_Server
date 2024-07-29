namespace API_Server.Models
{
    public class PaymentMethod
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Image { get; set; }

        public bool Status { get; set; }

        public PaymentMethod()
        {
            Status = true;
        }
    }
}
