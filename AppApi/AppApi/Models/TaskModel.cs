using System.ComponentModel.DataAnnotations;

namespace AppApi.Models
{
    public class TaskModel
    {
        public Guid Id { get; set; }

        [Required]
        public string Title { get; set; }

        public bool IsCompleted { get; set; }
    }
}
