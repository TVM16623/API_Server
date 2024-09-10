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
    public class DiscountCodesController : ControllerBase
    {
        private readonly API_ServerContext _context;

        public DiscountCodesController(API_ServerContext context)
        {
            _context = context;
        }

        // GET: api/DiscountCodes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DiscountCode>>> GetDiscountCodes()
        {
            return await _context.DiscountCodes.ToListAsync();
        }

        // GET: api/DiscountCodes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DiscountCode>> GetDiscountCode(int id)
        {
            var discountCode = await _context.DiscountCodes.FindAsync(id);

            if (discountCode == null)
            {
                return NotFound();
            }

            return discountCode;
        }

        // PUT: api/DiscountCodes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDiscountCode(int id, DiscountCode discountCode)
        {
            if (id != discountCode.Id)
            {
                return BadRequest();
            }

            _context.Entry(discountCode).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DiscountCodeExists(id))
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

        // POST: api/DiscountCodes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DiscountCode>> PostDiscountCode(DiscountCode discountCode)
        {
            _context.DiscountCodes.Add(discountCode);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDiscountCode", new { id = discountCode.Id }, discountCode);
        }

        // DELETE: api/DiscountCodes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDiscountCode(int id)
        {
            var discountCode = await _context.DiscountCodes.FindAsync(id);
            if (discountCode == null)
            {
                return NotFound();
            }

            _context.DiscountCodes.Remove(discountCode);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DiscountCodeExists(int id)
        {
            return _context.DiscountCodes.Any(e => e.Id == id);
        }
    }
}
