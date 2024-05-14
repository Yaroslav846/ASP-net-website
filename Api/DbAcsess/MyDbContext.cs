using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Models;
using static ReactApp1.Server.Models.FormDataEntity;

namespace ReactApp1.Server.DbAcsess
{
    public class MyDbContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public MyDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public DbSet<FormDataEntity> FormDataEntities { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(_configuration.GetConnectionString("Db"));
        }
    }
}
