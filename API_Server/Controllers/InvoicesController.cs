using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Server.Data;
using API_Server.Models;

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoicesController : ControllerBase
    {
        private readonly API_ServerContext _context;

        public InvoicesController(API_ServerContext context)
        {
            _context = context;
        }

        // GET: api/Invoices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices()
        {
            return await _context.Invoices
                                .Include(i => i.User)
                                .Include(i => i.PaymentMethod)
                                .Include(i => i.DiscountCode)
                                .ToListAsync();
        }

        // GET: api/Invoices/User
        [HttpGet]
        [Route("GetInvoiceByUser/{userId}")]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoiceByUser(string userId)
        {
            var invoice = await _context.Invoices
                                        .Include(i => i.User)
                                        .Include(i => i.PaymentMethod)
                                        .Include(i => i.DiscountCode)
                                        .Where(c => c.UserId == userId).ToListAsync();
            return invoice;
        }

        // GET: api/Invoices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Invoice>> GetInvoice(int id)
        {
            var invoice = await _context.Invoices.FindAsync(id);

            if (invoice == null)
            {
                return NotFound();
            }

            return invoice;
        }

        // PUT: api/Invoices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoice(int id, Invoice invoice)
        {
            if (id != invoice.Id)
            {
                return BadRequest();
            }

            _context.Entry(invoice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // PUT: api/Invoices/Cancel/5
        [HttpPut("Cancel/{id}")]
        public async Task<IActionResult> CancelInvoice(int id)
        {
            var invoice = await _context.Invoices.FindAsync(id);
            if (invoice == null)
            {
                return NotFound();
            }

            invoice.Status = 5; // Đổi trạng thái thành 5 (đã hủy)

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // PUT: api/Invoices/Cancel/5
        [HttpPut("Process/{id}")]
        public async Task<IActionResult> ProcessInvoice(int id)
        {
            var invoice = await _context.Invoices.FindAsync(id);
            if (invoice == null)
            {
                return NotFound();
            }

            invoice.Status += 1; 

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Invoices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Invoice>> PostInvoice(Invoice invoice)
        {
            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();

            if (invoice.Id == 0)
            {
                // Xử lý lỗi khi không lưu được Invoice vào cơ sở dữ liệu
                // Ví dụ: Ghi log, thông báo lỗi, hoặc trả về lỗi HTTP
                return BadRequest("Failed to save the invoice"); // Hoặc mã lỗi HTTP phù hợp
            }

            // Lấy danh sách các sản phẩm trong giỏ hàng
            var cartItems = _context.Carts.Where(c => c.UserId == invoice.UserId).ToList();

            // Tạo InvoiceDetail cho mỗi sản phẩm trong giỏ hàng
            foreach (var cartItem in cartItems)
            {
                var phone = _context.Phones.FirstOrDefault(p => p.Id == cartItem.PhoneId);

                if (phone != null)
                {
                    var invoiceDetail = new InvoiceDetail
                    {
                        InvoiceId = invoice.Id,
                        PhoneId = phone.Id,
                        Quantity = cartItem.Quantity,
                        UnitPrice = phone.Price,
                        // Các thuộc tính khác của InvoiceDetail
                    };
                    _context.InvoiceDetails.Add(invoiceDetail);

                    // Trừ số lượng sản phẩm trong bảng Phone
                    phone.Stock -= cartItem.Quantity;
                }
                else
                {
                    // Xử lý ngoại lệ hoặc bỏ qua sản phẩm không tìm thấy
                    // Ví dụ: Ghi log, thông báo lỗi, hoặc tiếp tục vòng lặp
                }
            }

            // Xóa giỏ hàng sau khi đã tạo InvoiceDetails
            _context.Carts.RemoveRange(cartItems);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInvoice", new { id = invoice.Id }, invoice);
        }


        // DELETE: api/Invoices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoice(int id)
        {
            var invoice = await _context.Invoices.FindAsync(id);
            if (invoice == null)
            {
                return NotFound();
            }

            _context.Invoices.Remove(invoice);
            await _context.SaveChangesAsync();

            return NoContent();
        }



        private bool InvoiceExists(int id)
        {
            return _context.Invoices.Any(e => e.Id == id);
        }
    }
}
