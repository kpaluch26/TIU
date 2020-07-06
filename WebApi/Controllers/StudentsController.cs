using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebApi.Models;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudentsController : ControllerBase
    {
        private DatabaseContext _context { get; set; }

        public StudentsController(DatabaseContext context)
        {
            _context = context;
        }
        [HttpGet, Authorize]
        public IEnumerable<Student> GetAllStudent()
        {
            return _context.Students.ToList();
        }
        [HttpGet("{id}"), Authorize]
        public Student GetSpecifiedStudent(int id)
        {
            return _context.Students.SingleOrDefault(m => m.Id == id);
        }
        [HttpPost, Authorize(Roles = "admin")]
        public bool CreateStudent([FromBody] Student st)
        {
            _context.Students.Add(st);
            _context.SaveChanges();
            return true;
        }
        [HttpPut("{id}"), Authorize(Roles = "admin")]
        public bool Update(int id, [FromBody] Student st)
        {
            _context.Students.Update(st);
            _context.SaveChanges();
            return true;
        }
        [HttpDelete("{id}"), Authorize(Roles = "admin")]
        public void DeleteStudent(int id)
        {
            var student = _context.Students.FirstOrDefault(t => t.Id == id);
            if (student != null)
            {
                _context.Students.Remove(student);
                _context.SaveChanges();
            }
        }

    }
}
