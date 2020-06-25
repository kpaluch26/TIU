using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private DatabaseContext _context { get; set; }

        public UsersController(DatabaseContext context)
        {
            _context = context;
        }
        [HttpGet, Authorize]
        public IEnumerable<User> Get()
        {
            return _context.Users.ToList();
        }
        [HttpGet("{id}"), Authorize]
        public User GetOne(int id)
        {
            return _context.Users.SingleOrDefault(m => m.Id == id);
        }
    }
}