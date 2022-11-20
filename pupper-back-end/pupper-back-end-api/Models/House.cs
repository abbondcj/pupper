using System.ComponentModel.DataAnnotations;

namespace pupper_back_end_api.Models
{
    public class House
    {
        public int Id { get; set; }
        [Required]
        public int HouseOwnerId { get; set; }
        [Required, MaxLength(40)]
        public string Name { get; set; }
        [Required]
        public int JoinCode { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Zip { get; set; }
    }
}
