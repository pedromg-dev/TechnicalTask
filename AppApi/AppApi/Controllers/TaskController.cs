using AppApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace AppApi.Controllers
{
    public class TaskRequest
    {
        public string? Title { get; set; }

        public string? Id { get; set; }
    }

    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
        private static List<TaskModel> Summaries = new();


        [HttpGet("getalltasks")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IEnumerable<TaskModel> GetAll()
        {
            return Summaries;
        }

        [HttpPost("createtask")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult CreateTask([FromBody] TaskRequest request)
        {
            var task = new TaskModel()
            {
                Id = Guid.NewGuid(),
                IsCompleted = false,
                Title = request.Title
            };

            Summaries.Add(task);
            return Ok();
        }

        [HttpPut("completetask")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult CompleteTask([FromBody] TaskRequest request)
        {
            var task = Summaries.FirstOrDefault(t => t.Id.ToString() == request.Id);
            if (task == null) return BadRequest();

            task.IsCompleted = true;

            return Ok();
        }
    }
}
