using System.ComponentModel.DataAnnotations;

namespace pupper_back_end_api.Models
{
    public class Activity
    {
        public int Id { get; set; }
        [Required]
        public int PupId { get; set; }
        [Required]
        public int HouseId { get; set; }
        [Required]
        public int ActivityTypeId { get; set; }
        public ActivityType? ActivityType { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public DateTime DateTime { get; set; }
        public string? Description { get; set; }
    }
}
