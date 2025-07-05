package forms;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
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
    @Email
    @Pattern(regexp = ".+@.+\\..+", message = "Invalid email format")
    @Column(unique = true)
    private String email;

    @NotBlank(message = "must be filled")
    private String password;

}
