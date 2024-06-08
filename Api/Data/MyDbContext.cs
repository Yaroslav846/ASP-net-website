using Microsoft.EntityFrameworkCore;
using Api.Models;

namespace Api.Server.Data
{
    public class MyDbContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public MyDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public DbSet<SubmitData> SubmitData { get; set; }
        public DbSet<User> Users { set; get; }
        //public DbSet<NotificationConfig> NotificationConfigs { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(_configuration.GetConnectionString("Db"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity => { entity.HasIndex(e => e.Email).IsUnique(); });

            modelBuilder.Entity<SubmitData>()
                .Ignore(s => s.QuestionAnswers) // Игнорируем это свойство, так как мы будем хранить его как JSON
                .Property(s => s.QuestionAnswersJson) // Указываем EF Core, что это свойство будет маппиться в базу данных
                .HasColumnType("jsonb"); // Предполагается, что вы используете PostgreSQL с jsonb

            base.OnModelCreating(modelBuilder);
        }
    }
}
