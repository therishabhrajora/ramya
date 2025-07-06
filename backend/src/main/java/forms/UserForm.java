package forms;

import org.hibernate.validator.constraints.Length;

import static helper.ValidationMessageConstants.*;
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
    

    @NotBlank(message = FIELD_REQUIRED)
    private String lastName;

    @NotBlank(message = FIELD_REQUIRED)
    @Email
    @Pattern(regexp = ".+@.+\\..+", message = INVALID_EMAIL)
    @Column(unique = true)
    private String email;

    @NotBlank(message = FIELD_REQUIRED)
    private String password;

    @Pattern(regexp = "^[0-9]{10}$", message = PHONE_NUMBER_MUST_BE_10_DIGIT)
    @NotBlank(message = FIELD_REQUIRED)
    @Length(max = 10)
    private String phone; 
}
