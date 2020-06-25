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
    public class StudentsController
    {

        [ApiController]
        [Route("[controller]")]
        public class WorkersController : ControllerBase
        {
            private DatabaseContext _context { get; set; }

            public WorkersController(DatabaseContext context)
            {
                _context = context;
            }
            [HttpGet, Authorize]
            public IEnumerable<Student> Get()
            {
                return _context.Students.ToList();
            }
            [HttpGet("{id}"), Authorize]
            public Student GetOne(int id)
            {
                return _context.Students.SingleOrDefault(m => m.Id == id);
            }
            [HttpPost, Authorize(Roles = "admin")]
            public bool Create([FromBody] Student st)
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
            public void Delete(int id)
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
}
