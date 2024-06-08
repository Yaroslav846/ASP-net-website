using Api.Models;
using Api.Server.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Api.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class NotificationConfigController : ControllerBase
    {
        private readonly string _configFilePath = "/app/notificationConfig.json";

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] NotificationConfig config)
        {
            // Serialize and save the config to a JSON file
            await System.IO.File.WriteAllTextAsync(_configFilePath, JsonConvert.SerializeObject(config, Formatting.Indented));
            return Ok(config);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            if (!System.IO.File.Exists(_configFilePath))
            {
                return NotFound("Configuration not found.");
            }

            var configJson = await System.IO.File.ReadAllTextAsync(_configFilePath);
            var config = JsonConvert.DeserializeObject<NotificationConfig>(configJson);
            return Ok(config);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] NotificationConfig config)
        {
            if (!System.IO.File.Exists(_configFilePath))
            {
                return NotFound("Configuration not found.");
            }

            await System.IO.File.WriteAllTextAsync(_configFilePath, JsonConvert.SerializeObject(config, Formatting.Indented));
            return Ok(config);
        }
    }

}
