using System.ComponentModel.DataAnnotations;

namespace pupper_back_end_api.Models
{
    public class HouseMember
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public int HouseId { get; set; }
    }
}
