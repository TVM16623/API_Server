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
    public class PhoneModelImagesController : ControllerBase
    {
        private readonly API_ServerContext _context;
        private readonly IWebHostEnvironment _environment;

        public PhoneModelImagesController(API_ServerContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: api/PhoneModelImages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhoneModelImage>>> GetPhoneModelImages()
        {
            return await _context.PhoneModelImages
                                 .Include(p => p.PhoneModel)
                                 .ToListAsync();
        }

        [HttpGet("GetPhoneModelImagesByPhoneModelId")]
        public async Task<ActionResult<IEnumerable<PhoneModelImage>>> GetPhoneModelImagesByPhoneModelId(int id)
        {
            var phoneModelImages = await _context.PhoneModelImages
                .Where(p => p.PhoneModelId == id)
                .ToListAsync();

            return phoneModelImages;
        }

        // GET: api/PhoneModelImages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PhoneModelImage>> GetPhoneModelImage(int id)
        {
            var phoneModelImage = await _context.PhoneModelImages
                                                .Include(p => p.PhoneModel)
                                                .FirstOrDefaultAsync(p => p.Id == id);

            if (phoneModelImage == null)
            {
                return NotFound();
            }

            return phoneModelImage;
        }

        // PUT: api/PhoneModelImages/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPhoneModelImage([FromForm] int id, [FromForm] PhoneModelImage phoneModelImage, string nameFile)
        {
            if (id != phoneModelImage.Id)
            {
                return BadRequest();
            }

            _context.Entry(phoneModelImage).State = EntityState.Modified;

            try
            {
                if (phoneModelImage.ImageFile != null && phoneModelImage.ImageFile.Length > 0)
                {
                    var fileName = phoneModelImage.ImageFile.FileName;

                    var imagePath = Path.Combine(_environment.WebRootPath, "Image", "PhoneModel", nameFile.ToString());

                    var uploadPath = Path.Combine(imagePath, fileName);
                    using (var fileStream = new FileStream(uploadPath, FileMode.Create))
                    {
                        await phoneModelImage.ImageFile.CopyToAsync(fileStream);
                    }
                    //Xóa ảnh cũ
                    var oldImagePath = Path.Combine(_environment.WebRootPath, "Image", "PhoneModel", nameFile, phoneModelImage.Image);
                    if (System.IO.File.Exists(oldImagePath))
                    {
                        System.IO.File.Delete(oldImagePath);
                    }

                    // Lưu đường dẫn hình ảnh vào trường Image
                    phoneModelImage.Image = phoneModelImage.ImageFile.FileName;
                }
                _context.PhoneModelImages.Update(phoneModelImage);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhoneModelImageExists(id))
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

        // POST: api/PhoneModelImages
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PhoneModelImage>> PostPhoneModelImage([FromForm] PhoneModelImage phoneModelImage, string nameFile)
        {
            if (phoneModelImage.ImageFile != null && phoneModelImage.ImageFile.Length > 0)
            {
                var fileName = phoneModelImage.ImageFile.FileName;

                var imagePath = Path.Combine(_environment.WebRootPath, "Image", "PhoneModel", nameFile.ToString());

                var uploadPath = Path.Combine(imagePath, fileName);
                using (var fileStream = new FileStream(uploadPath, FileMode.Create))
                {
                    await phoneModelImage.ImageFile.CopyToAsync(fileStream);
                }

                // Lưu đường dẫn hình ảnh vào trường Image
                phoneModelImage.Image = phoneModelImage.ImageFile.FileName;
            }

            _context.PhoneModelImages.Add(phoneModelImage);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPhoneModelImage", new { id = phoneModelImage.Id }, phoneModelImage);
        }

        // DELETE: api/PhoneModelImages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoneModelImage(int id, string nameFile)
        {
            var phoneModelImage = await _context.PhoneModelImages.FindAsync(id);
            if (phoneModelImage == null)
            {
                return NotFound();
            }
            //Xóa ảnh
            var oldImagePath = Path.Combine(_environment.WebRootPath, "Image", "PhoneModel", nameFile, phoneModelImage.Image);
            if (System.IO.File.Exists(oldImagePath))
            {
                System.IO.File.Delete(oldImagePath);
            }

            _context.PhoneModelImages.Remove(phoneModelImage);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PhoneModelImageExists(int id)
        {
            return _context.PhoneModelImages.Any(e => e.Id == id);
        }
    }
}
