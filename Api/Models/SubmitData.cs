namespace ReactApp1.Server.Models
{
    public class SubmitData
    {
        public class FormData
        {
            public string Name { get; set; }
            public string Phone { get; set; }
            public string Email { get; set; }
            public QuestionAnswer[] Questions { get; set; }
        }

        public class QuestionAnswer
        {
            public string Question { get; set; }
            public object Answer { get; set; } // Can be a string or an array
            public string? Dimensions { get; set; } // Change here
        }
    }
}
