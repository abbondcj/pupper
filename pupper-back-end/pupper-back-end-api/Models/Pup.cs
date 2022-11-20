using System.ComponentModel.DataAnnotations;

namespace pupper_back_end_api.Models
{
    public class Pup
    {
        public int Id { get; set; }
        [Required]
        public int OwnerId { get; set; }
        [Required]
        public int HouseId { get; set; }
        [Required, MaxLength(40)]
        public string Name { get; set; }
        [Required, MaxLength(40)]
        public string? Breed { get; set; }
        public int? Gender { get; set; }
        public int? AgeYears { get; set; }
        public int? AgeMonths { get; set; }
    }
}
