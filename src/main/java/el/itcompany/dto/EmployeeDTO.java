package el.itcompany.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeDTO {
    private Long id;
    private String firstName;  // Maps to vorname
    private String lastName;   // Maps to nachname
    private String email;

    // Related entity IDs
    private Long positionId;
    private Long buildingId;
    private Long sectorId;

    // Related entity names and additional info
    private String positionName;
    private String buildingName;
    private String buildingAddress;
    private String sectorName;
    private String sectorSalaryClass;
}