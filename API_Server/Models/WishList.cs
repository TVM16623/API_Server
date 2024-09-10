using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
    public class WishList
    {
        public int Id { get; set; }

        [DefaultValue(true)]
        public bool Status { get; set; }

        [ForeignKey("UserId")]
        public string UserId { get; set; }

        public User User { get; set; }

        public int PhoneModelId { get; set; }

        public PhoneModel PhoneModel { get; set; }
        public WishList()
        {
            Status = true;
        }
    }
}
