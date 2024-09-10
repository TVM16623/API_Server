using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
    public class Phone
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Color { get; set; }

        public string Storage { get; set; }

        public string Image { get; set; }

        [NotMapped]
        public IFormFile ImageFile { get; set; }

        [DefaultValue(0)]
        public int Price { get; set; }

        [DefaultValue(0)]
        public int Stock { get; set; }

        [DefaultValue(true)]
        public bool Status { get; set; }

        public int PhoneModelId { get; set; }

        public PhoneModel PhoneModel { get; set; }

        public Phone()
        {
            Status = true;
            Price = 0;
            Stock = 0;
        }
    }
}
