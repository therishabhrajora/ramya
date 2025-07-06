package forms;

import org.springframework.web.multipart.MultipartFile;

import static helper.ValidationMessageConstants.*;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ProductForm {
    
    @NotBlank(message = FIELD_REQUIRED)
    private String name;

    private MultipartFile image;
    @NotBlank(message = FIELD_REQUIRED)
    private String gender;
    @NotBlank(message = FIELD_REQUIRED)
    private String category;
    @NotBlank(message = FIELD_REQUIRED)
    private String color;

    @Min(value = 1, message = VALUE_MUST_BE_POSITIVE)
    private float price;

    @Min(value = 1, message = VALUE_MUST_BE_POSITIVE)
    private int pocket;

    @Min(value = 1, message = VALUE_MUST_BE_POSITIVE)
    private float rating;
}
