namespace ReactApp1.Server.Models
{
    public class FormDataEntity
    {
        public int Id { get; set; } // Предположим, что у вас есть столбец Id в таблице FormData

        public string Name { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string Questions { get; set; }
    }
}