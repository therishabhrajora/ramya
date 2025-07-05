package forms;

import org.springframework.web.multipart.MultipartFile;

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
    @NotBlank(message = "must be filled")
    private String name;

    private MultipartFile image;
    @NotBlank(message = "must be filled")
    private String gender;
    @NotBlank(message = "must be filled")
    private String category;
    @NotBlank(message = "must be filled")
    private String color;

    @Min(value = 1, message = "Pocket must be at least 1")
    private float price;

    @Min(value = 1, message = "Pocket must be at least 1")
    private int pocket;

    @Min(value = 1, message = "Pocket must be at least 1")
    private float rating;
}
