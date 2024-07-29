using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Server.Data;
using API_Server.Models;
using Microsoft.Extensions.Hosting;

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhonesController : ControllerBase
    {
        private readonly API_ServerContext _context;
        private readonly IWebHostEnvironment _environment;

        public PhonesController(API_ServerContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: api/Phones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Phone>>> GetPhones()
        {
            return await _context.Phones
                                 .Include(p => p.PhoneModel)
                                 .ToListAsync();
        }

        [HttpGet("GetPhoneByColorAndStorage")]
        public IActionResult GetPhoneByColorAndStorage(int id, string color, string storage)
        {
            var phone = _context.Phones.FirstOrDefault(p => p.PhoneModelId == id && p.Color == color && p.Storage == storage);
            if (phone == null)
            {
                return NotFound();
            }

            return Ok(phone);
        }

        // GET: api/Phones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Phone>> GetPhone(int id)
        {
            var phone = await _context.Phones
                .Include(p => p.PhoneModel)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (phone == null)
            {
                return NotFound();
            }

            return phone;
        }

        // GET: api/Phones/GetStorages/5
        [HttpGet("GetStorages/{id}")]
        public async Task<ActionResult<List<string>>> GetStoragesPhone(int id)
        {
            var phoneStorages = await _context.Phones
                                      .Where(p => p.PhoneModelId == id)
                                      .Select(p => p.Storage).Distinct()
                                      .ToListAsync();

            if (phoneStorages == null)
            {
                return NotFound();
            }

            return phoneStorages;
        }

        // GET: api/Phones/GetColors/5
        [HttpGet("GetColors/{id}")]
        public async Task<ActionResult<List<string>>> GetColorsPhone(int id)
        {
            var phoneColors = await _context.Phones
                                      .Where(p => p.PhoneModelId == id)
                                      .Select(p => p.Color).Distinct()
                                      .ToListAsync();

            if (phoneColors == null)
            {
                return NotFound();
            }

            return phoneColors;
        }

        // PUT: api/Phones/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPhone([FromForm] int id, [FromForm] Phone phone, string nameFile)
        {
            if (id != phone.Id)
            {
                return BadRequest();
            }

            _context.Entry(phone).State = EntityState.Modified;

            try
            {
                if (phone.ImageFile != null && phone.ImageFile.Length > 0)
                {
                    var fileName = phone.ImageFile.FileName;

                    var imagePath = Path.Combine(_environment.WebRootPath, "Image", "PhoneModel", nameFile.ToString());

                    var uploadPath = Path.Combine(imagePath, fileName);
                    using (var fileStream = new FileStream(uploadPath, FileMode.Create))
                    {
                        await phone.ImageFile.CopyToAsync(fileStream);
                    }
                    //Xóa ảnh cũ
                    var oldImagePath = Path.Combine(_environment.WebRootPath, "Image", "PhoneModel", nameFile, phone.Image);
                    if (System.IO.File.Exists(oldImagePath))
                    {
                        System.IO.File.Delete(oldImagePath);
                    }

                    // Lưu đường dẫn hình ảnh vào trường Image
                    phone.Image = phone.ImageFile.FileName;
                }

                _context.Phones.Update(phone);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhoneExists(id))
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

        // POST: api/Phones
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Phone>> PostPhone([FromForm] Phone phone, string nameFile)
        {
            if (phone.ImageFile != null && phone.ImageFile.Length > 0)
            {
                var fileName = phone.ImageFile.FileName;

                var imagePath = Path.Combine(_environment.WebRootPath, "Image", "PhoneModel", nameFile.ToString());

                var uploadPath = Path.Combine(imagePath, fileName);
                using (var fileStream = new FileStream(uploadPath, FileMode.Create))
                {
                    await phone.ImageFile.CopyToAsync(fileStream);
                }

                // Lưu đường dẫn hình ảnh vào trường Image
                phone.Image = phone.ImageFile.FileName;
            }

            _context.Phones.Add(phone);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPhone", new { id = phone.Id }, phone);
        }

        // DELETE: api/Phones/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhone(int id, string nameFile)
        {
            var phone = await _context.Phones.FindAsync(id);
            if (phone == null)
            {
                return NotFound();
            }
            //Xóa ảnh
            var oldImagePath = Path.Combine(_environment.WebRootPath, "Image", "PhoneModel", nameFile, phone.Image);
            if (System.IO.File.Exists(oldImagePath))
            {
                System.IO.File.Delete(oldImagePath);
            }

            _context.Phones.Remove(phone);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PhoneExists(int id)
        {
            return _context.Phones.Any(e => e.Id == id);
        }
    }
}
