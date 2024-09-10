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
using System.Drawing.Drawing2D;

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhoneModelsController : ControllerBase
    {
        private readonly API_ServerContext _context;
        private readonly IWebHostEnvironment _environment;

        public PhoneModelsController(API_ServerContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: api/PhoneModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhoneModel>>> GetPhoneModels()
        {
            return await _context.PhoneModels
                                 .Include(p => p.Brand)
                                 .ToListAsync();
        }

        [HttpGet("GetPhoneModelsByBrand")]
        public async Task<ActionResult<IEnumerable<PhoneModel>>> GetPhoneByColorAndStorage(int BrandId)
        {
            var phoneModels = await _context.PhoneModels
                                            .Where(pm =>  pm.BrandId == BrandId)
                                            .ToListAsync();

            if (phoneModels == null)
            {
                return NotFound();
            }

            return phoneModels;
        }

        // GET: api/PhoneModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PhoneModel>> GetPhoneModel(int id)
        {
            var phoneModel = await _context.PhoneModels
                                            .Include(p => p.Brand)
                                            .FirstOrDefaultAsync(p => p.Id == id);

            if (phoneModel == null)
            {
                return NotFound();
            }

            return phoneModel;
        }

        // PUT: api/PhoneModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPhoneModel([FromForm] int id, [FromForm] PhoneModel phoneModel)
        {
            if (id != phoneModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(phoneModel).State = EntityState.Modified;

            try
            {
                if (phoneModel.ImageFile != null && phoneModel.ImageFile.Length > 0)
                {
                    var fileName = phoneModel.ImageFile.FileName;
                    var folderName = phoneModel.Name; // Lấy tên folder từ phoneModel.name

                    var imagePath = Path.Combine(_environment.WebRootPath, "Image", "PhoneModel", folderName);
                    Directory.CreateDirectory(imagePath); // Tạo thư mục nếu chưa tồn tại

                    var uploadPath = Path.Combine(imagePath, fileName);
                    using (var fileStream = new FileStream(uploadPath, FileMode.Create))
                    {
                        await phoneModel.ImageFile.CopyToAsync(fileStream);
                    }
                    //Xóa ảnh cũ
                    var oldImagePath = Path.Combine(_environment.WebRootPath, "Image", "PhoneModel", folderName, phoneModel.Image);
                    if (System.IO.File.Exists(oldImagePath))
                    {
                        System.IO.File.Delete(oldImagePath);
                    }

                    // Lưu đường dẫn hình ảnh vào trường Image
                    phoneModel.Image = phoneModel.ImageFile.FileName;
                }

                _context.PhoneModels.Update(phoneModel);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhoneModelExists(id))
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

        // POST: api/PhoneModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PhoneModel>> PostPhoneModel([FromForm] PhoneModel phoneModel)
        {
            if (phoneModel.ImageFile != null && phoneModel.ImageFile.Length > 0)
            {
                var fileName = phoneModel.ImageFile.FileName;
                var folderName = phoneModel.Name; // Lấy tên folder từ phoneModel.name

                var imagePath = Path.Combine(_environment.WebRootPath, "Image", "PhoneModel", folderName);
                Directory.CreateDirectory(imagePath); // Tạo thư mục nếu chưa tồn tại

                var uploadPath = Path.Combine(imagePath, fileName);
                using (var fileStream = new FileStream(uploadPath, FileMode.Create))
                {
                    await phoneModel.ImageFile.CopyToAsync(fileStream);
                }

                // Lưu đường dẫn hình ảnh vào trường Image
                phoneModel.Image = phoneModel.ImageFile.FileName;
            }

            _context.PhoneModels.Add(phoneModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPhoneModel", new { id = phoneModel.Id }, phoneModel);
        }

        // DELETE: api/PhoneModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoneModel(int id)
        {
            var phoneModel = await _context.PhoneModels.FindAsync(id);
            if (phoneModel == null)
            {
                return NotFound();
            }
            // Xóa thư mục ảnh
            var imagePath = Path.Combine(_environment.WebRootPath, "Image", "PhoneModel", phoneModel.Name);
            if (Directory.Exists(imagePath))
            {
                Directory.Delete(imagePath, true);
            }

            _context.PhoneModels.Remove(phoneModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PhoneModelExists(int id)
        {
            return _context.PhoneModels.Any(e => e.Id == id);
        }
    }
}
