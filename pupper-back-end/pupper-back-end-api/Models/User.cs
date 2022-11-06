using System.ComponentModel.DataAnnotations;

namespace pupper_back_end_api.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required, StringLength(28, MinimumLength = 28)]
        public string FirebaseId { get; set; }

        [Required, MaxLength(254)]
        public string Email { get; set; }

        [MaxLength(40)]
        public string? FirstName { get; set; }

        [MaxLength(40)]
        public string? LastName { get; set; }

        [MaxLength(40)]
        public string? Username { get; set; }
        public int? PrimaryHouseId { get; set; }


    }
}
