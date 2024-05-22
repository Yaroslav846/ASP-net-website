using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net;
using System.Net.Mail;
using Api.Contracts;
using Api.Server.Data;
using Api.Models;

namespace Api.Server.Controllers
{

    [ApiController]
    [Route("/api/[controller]")]
    public class SubmitDataController : ControllerBase
    {
        private readonly MyDbContext _dbContext;

        public SubmitDataController(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateSubmitRequest request)
        {
            try
            {
                // Convert object[] to SubmitData.QuestionAnswer[]
                var questionsArray = JsonConvert.DeserializeObject<SubmitData.QuestionAnswer[]>(JsonConvert.SerializeObject(request.Questions));

                var formData = new SubmitData
                (
                    request.Name,
                    request.Phone,
                    request.Email,
                    questionsArray
                );

                // Save data to PostgreSQL
                await SaveToDatabase(formData);

                // Send data to email
                await SendToEmail(formData);

                // Send data to Telegram
                //await SendToTelegram(formData);

                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while saving the entity changes: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                }
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        private async Task SaveToDatabase(SubmitData formData)
        {
            _dbContext.SubmitData.Add(formData);
            await _dbContext.SaveChangesAsync();
        }
        private async Task SendToEmail(SubmitData formData)
        {
            // Configure SMTP client
            using (var client = new SmtpClient("smtp.mail.ru"))
            {
                client.Port = 587;
                client.Credentials = new NetworkCredential("kitchenquiz@mail.ru", "9Sm72pJaMrhUtbN2LiHH");
                client.EnableSsl = true;

                // Serialize questions array to JSON
                string questionsFormatted = string.Join("\n", formData.QuestionAnswers.Select(q => $"{q.Question}: {GetAnswerString(q.Answer, q.Dimensions)}"));

                // Construct email message
                var message = new MailMessage("kitchenquiz@mail.ru", "yaroslavend@gmail.com")
                {
                    Subject = "Новый клиент прошел опрос!",
                    Body = $"Его зовут: {formData.Name}\nНомер телефона: {formData.Phone}\nПочта: {formData.Email}\nОтветы на вопросы:\n{questionsFormatted}"
                };

                // Send email
                await client.SendMailAsync(message);
            }
        }

        private async Task SendToTelegram(SubmitData formData)
        {
            // Assuming you have a Telegram bot configured with a token
            string botToken = "5092471384:AAFazmiwop5RVwG3m0TvemMP4vXB5mGx2AE";
            string chatId = "-1001562286424"; // Replace with your chat ID

            string questionsFormatted = string.Join("\n", formData.QuestionAnswers.Select(q => $"{q.Question}: {GetAnswerString(q.Answer, q.Dimensions)}"));

            string message = $"Новый клиент прошел опрос!\nЕго зовут: {formData.Name}\nНомер телефона: {formData.Phone}\nПочта: {formData.Email}\nОтветы на вопросы:\n{questionsFormatted}";

            string url = $"https://api.telegram.org/bot{botToken}/sendMessage?chat_id={chatId}&text={WebUtility.UrlEncode(message)}";

            using (var client = new WebClient())
            {
                await client.DownloadStringTaskAsync(new Uri(url));
            }
        }

        private string GetAnswerString(object answer, object dimensions)
        {
            if (answer is string)
                if (dimensions != null)
                {
                    return $"{answer} ({dimensions}метров)";
                }
                else
                {
                    return (string)answer;
                }
            else if (answer is string[])
                return string.Join(",", (string[])answer);
            else if (answer is JArray)
                return string.Join(",", ((JArray)answer).ToObject<string[]>());
            else if (answer == null)
                return "Ответ не указан";
            else
                return "Неизвестный ответ";
        }

    }
}
