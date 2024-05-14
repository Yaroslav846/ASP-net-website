using Microsoft.EntityFrameworkCore;
using Npgsql;
using ReactApp1.Server.DbAcsess;
using System;
using System.Threading.Tasks;
using Telegram.Bot;
using Telegram.Bot.Args;

namespace ReactApp1.Server
{
    public class TelegramBot
    {
        private readonly MyDbContext _dbContext;

        public TelegramBot(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        static async Task Main(string[] args)
        {
            

            // Инициализируем бота с его API токеном
            var bot = new TelegramBotClient("YOUR_TELEGRAM_API_TOKEN");

            // Обработчик входящих сообщений
            bot.OnMessage += async (sender, e) =>
            {
                if (e.Message.Text != null)
                {
                    var message = e.Message;

                    if (message.Text.StartsWith("/getdata"))
                    {
                        await bot.SendTextMessageAsync(message.Chat.Id, await GetDataFromDatabase(dbContext));
                    }
                    else if (message.Text.StartsWith("/monitor"))
                    {
                        await bot.SendTextMessageAsync(message.Chat.Id, "Monitoring server...");
                        // Место для вашей логики мониторинга сервера
                        await Task.Delay(5000); // Симуляция процесса мониторинга (задержка 5 секунд)
                        await bot.SendTextMessageAsync(message.Chat.Id, "Server is up and running.");
                    }
                    else
                    {
                        await bot.SendTextMessageAsync(message.Chat.Id, "Unknown command. Available commands: /getdata, /monitor");
                    }
                }
            };

            bot.StartReceiving();
            Console.WriteLine("Bot started receiving messages...");

            await Task.Delay(-1);
        }

        private static async Task<string> GetDataFromDatabase(MyDbContext dbContext)
        {
            var data = await dbContext.YourEntity.ToListAsync(); // YourEntity - ваша модель данных из базы данных
            string result = "Data from database:\n";
            foreach (var item in data)
            {
                result += $"{item.Property1} - {item.Property2}\n"; // Настройте вывод в соответствии с вашей моделью данных
            }
            return result;
        }
    }
}
