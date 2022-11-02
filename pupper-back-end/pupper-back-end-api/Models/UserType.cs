using System.ComponentModel.DataAnnotations;

namespace pupper_back_end_api.Models
{
    public class UserType
    {
        [Required]
        public int Id { get; set; }

        [Required, MaxLength(40)]
        public string Type { get; set; }

    }
}
