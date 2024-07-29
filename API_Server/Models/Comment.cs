using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
    public class Comment
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public DateTime Day { get; set; }

        [DefaultValue(0)]
        public int Like { get; set; }

        [DefaultValue(true)]
        public bool Status { get; set; }

        [ForeignKey("UserId")]
        public string UserId { get; set; }

        public User User { get; set; }

        public int PhoneModelId { get; set; }

        public PhoneModel PhoneModel { get; set; }
      
        public int? ParentCommentId { get; set; }

        [ForeignKey("ParentCommentId")]
        public Comment ParentComment { get; set; }

        public Comment()
        {
            Status = true;
        }
    }
}
