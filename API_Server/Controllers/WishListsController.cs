using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Server.Data;
using API_Server.Models;
using Microsoft.AspNetCore.Authorization;

namespace API_Server.Controllers
{
   
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WishListsController : ControllerBase
    {
        private readonly API_ServerContext _context;

        public WishListsController(API_ServerContext context)
        {
            _context = context;
        }

        // GET: api/WishLists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WishList>>> GetWishLists()
        {
            return await _context.WishLists
                .Include(p => p.PhoneModel)
                .ToListAsync();
        }

        // GET: api/WishLists/User
        [HttpGet]
        [Route("GetWishListByUser/{userId}")]
        public async Task<ActionResult<IEnumerable<WishList>>> GetWishListByUser(string userId)
        {
            var wishlist = await _context.WishLists.Include(c => c.PhoneModel)
                .Where(c => c.UserId == userId).ToListAsync();


            return wishlist;
        }

        // GET: api/WishLists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WishList>> GetWishList(int id)
        {
            var wishList = await _context.WishLists.FindAsync(id);

            if (wishList == null)
            {
                return NotFound();
            }

            return wishList;
        }

        // PUT: api/WishLists/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWishList(int id, WishList wishList)
        {
            if (id != wishList.Id)
            {
                return BadRequest();
            }

            _context.Entry(wishList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WishListExists(id))
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

        // POST: api/WishLists
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<WishList>> PostWishList(WishList wishList)
        {
            if (!_context.WishLists.Any(w => w.PhoneModelId == wishList.PhoneModelId && w.UserId == wishList.UserId))
            {
                _context.WishLists.Add(wishList);
                await _context.SaveChangesAsync();
            }

            return CreatedAtAction("GetWishList", new { id = wishList.Id }, wishList);
        }
        // DELETE: api/WishLists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWishList(int id)
        {
            var wishList = await _context.WishLists.FindAsync(id);
            if (wishList == null)
            {
                return NotFound();
            }

            _context.WishLists.Remove(wishList);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WishListExists(int id)
        {
            return _context.WishLists.Any(e => e.Id == id);
        }
    }
}
