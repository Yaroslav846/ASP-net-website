using Newtonsoft.Json;

namespace Api.Models
{
    public class SubmitData
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public QuestionAnswer[] QuestionAnswers { get; set; }
        public string QuestionAnswersJson { get; set; } // Stored as JSON in the database

        // Parameterless constructor
        public SubmitData()
        {
            Id = Guid.NewGuid();
            CreatedAt = DateTime.UtcNow;
        }

        // Constructor with parameters
        public SubmitData(string name, string phone, string email, QuestionAnswer[] questionAnswers) : this()
        {
            Name = name;
            Phone = phone;
            Email = email;
            QuestionAnswers = questionAnswers;
            QuestionAnswersJson = JsonConvert.SerializeObject(questionAnswers);
        }

        public class QuestionAnswer
        {
            public string Question { get; set; }
            public object Answer { get; set; } // Can be a string or an array
            public string? Dimensions { get; set; }
        }
    }
}
