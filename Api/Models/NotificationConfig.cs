namespace Api.Models
{
    public class NotificationConfig
    {
        public int Id { get; set; }  // Primary key
        public bool Mobile { get; set; }
        public bool communication_emails { get; set; }
        public bool social_emails { get; set; }
        public bool marketing_emails { get; set; }
        public bool security_emails { get; set; }
    }
}
