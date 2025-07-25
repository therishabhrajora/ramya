package forms;

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
public class LoginRequest {
    @NotBlank(message = EMAIL_REQUIRED)
    @Pattern(regexp = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$", message = INVALID_EMAIL)
    @Email(message = INVALID_EMAIL)
    @Column(unique = true)
    private String email;

    @NotBlank(message = PASSWORD_REQUIRED)
    private String password;

}
