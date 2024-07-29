using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
    public class PhoneModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Screen { get; set; }

        public string OperatingSystem { get; set; }

        public string RearCamera { get; set; }

        public string FrontCamera { get; set; }

        public string Chip { get; set; }

        public string RAM { get; set;}

        public string SIM { get; set; }

        public string BatteryAndCharger { get; set; }

        public string PhoneModelType { get; set; }

        public int OldPrice { get; set; }

        public int PromotionalPrice { get; set; }

        public string Image { get; set; }

        [NotMapped]
        public IFormFile ImageFile { get; set; }

        public double StarAverage { get; set; }

        [DefaultValue(true)]
        public bool Status { get; set; }

        public int BrandId { get; set; }

        public Brand Brand { get; set; }

        public PhoneModel()
        {
            Status = true;
        }
    }
}
