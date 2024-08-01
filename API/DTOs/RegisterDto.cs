﻿using System.ComponentModel.DataAnnotations;

namespace API;

public class RegisterDto
{
    [Required]
    // [MaxLength(100)]
    public required string UserName { get; set; }
    [Required]
    [StringLength(8, MinimumLength = 4)]
    public required string Password { get; set; }

}
