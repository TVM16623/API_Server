using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
    public class Review
    {
        public int Id { get; set; }

        public string Content { get; set; }

        [DefaultValue(0)]
        public int Star { get; set; }

        [DefaultValue(0)]
        public int Useful { get; set; }

        public string Image { get; set; }

        [DefaultValue(true)]
        public bool Status { get; set; }

        [ForeignKey("UserId")]
        public string UserId { get; set; }

        public User User { get; set; }

        public int PhoneModelId { get; set; }

        public PhoneModel PhoneModel { get; set; }

        public Review()
        {
            Status = true;
            Star = 0;
            Useful = 0;
        }
    }
}
