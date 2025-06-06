package el.itcompany.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateEmployeeDTO {
    private String firstName;  // Will map to vorname
    private String lastName;   // Will map to nachname
    private String email;

    private Long positionId;
    private Long buildingId;
    private Long sectorId;
}