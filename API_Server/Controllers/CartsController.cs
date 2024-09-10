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
    public class CartsController : ControllerBase
    {
        private readonly API_ServerContext _context;

        public CartsController(API_ServerContext context)
        {
            _context = context;
        }

        // GET: api/Carts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCarts()
        {
            return await _context.Carts
                                 .Include(C => C.Phone)
                                 .ThenInclude(c => c.PhoneModel)
                                 .ToListAsync();
        }

        [HttpGet]
        [Route("GetCartByUser/{userId}")]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCartsByUserId(string userId)
        {
            var carts = await _context.Carts.Include(c => c.Phone)
            .ThenInclude(p => p.PhoneModel).Where(c => c.UserId == userId).ToListAsync();
            return carts;
        }

        // GET: api/Carts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cart>> GetCart(int id)
        {
            var cart = await _context.Carts.FindAsync(id);

            if (cart == null)
            {
                return NotFound();
            }

            return cart;
        }

        // PUT: api/Carts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart(int id, Cart cart)
        {
            if (id != cart.Id)
            {
                return BadRequest();
            }

            _context.Entry(cart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
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

        // POST: api/Carts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Cart>> PostCart(Cart cart)
        {
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCart", new { id = cart.Id }, cart);
        }

        // DELETE: api/Carts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            var cart = await _context.Carts.FindAsync(id);
            if (cart == null)
            {
                return NotFound();
            }

            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // DELETE: api/Carts
        [HttpDelete("GetCartByUser/{userId}")]
        public async Task<IActionResult> DeleteCartByUserId(string userId)
        {
            // Lấy danh sách giỏ hàng dựa trên UserID
            var carts = await _context.Carts
                .Where(c => c.UserId == userId)
                .ToListAsync();

            if (carts == null || carts.Count == 0)
            {
                return NotFound();
            }

            // Xóa danh sách giỏ hàng
            _context.Carts.RemoveRange(carts);
            await _context.SaveChangesAsync();

            return NoContent();
        }



        private bool CartExists(int id)
        {
            return _context.Carts.Any(e => e.Id == id);
        }
    }
}
