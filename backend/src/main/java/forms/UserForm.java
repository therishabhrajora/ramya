package forms;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class UserForm {
    private String firstName;

    @NotBlank(message = "must be filled")
    private String lastName;

    @NotBlank(message = "must be filled")
    @Email
    @Pattern(regexp = ".+@.+\\..+", message = "Invalid email format")
    @Column(unique = true)
    private String email;

    @NotBlank(message = "must be filled")
    private String password;

    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
    @NotBlank(message = "must be filled")
    @Length(max = 10)
    private String phone; 
}
