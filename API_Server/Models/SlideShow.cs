using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
    public class SlideShow
    {
        public int Id { get; set; }

        public string Image { get; set; }

        [NotMapped]
        public IFormFile ImageFile { get; set; }

        [DefaultValue(true)]
        public bool Status { get; set; }

        public int PhoneModelId { get; set; }

        public PhoneModel PhoneModel { get; set; }

        public SlideShow()
        {
            Status = true;
        }
    }
}
