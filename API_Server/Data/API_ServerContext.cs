using API_Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API_Server.Data
{
    public class API_ServerContext : IdentityDbContext<User>
    {
        public API_ServerContext(DbContextOptions<API_ServerContext> options)
            : base(options)
        {
        }

        public DbSet<Brand> Brands { get; set; }

        public DbSet<Cart> Carts { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<DiscountCode> DiscountCodes { get; set; }

        public DbSet<Invoice> Invoices { get; set; }

        public DbSet<InvoiceDetail> InvoiceDetails { get; set; }

        public DbSet<PaymentMethod> PaymentMethods { get; set; }

        public DbSet<Phone> Phones { get; set; }

        public DbSet<PhoneModel> PhoneModels { get; set; }

        public DbSet<PhoneModelImage> PhoneModelImages { get; set; }

        public DbSet<Review> Reviews { get; set; }

        public DbSet<SlideShow> SlideShows { get; set; }

        public DbSet<WishList> WishLists { get; set; }
    }
}
