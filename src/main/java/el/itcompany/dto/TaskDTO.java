package el.itcompany.dto;

import lombok.Data;

@Data
public class TaskDTO {
    private Long id;
    private String description;
    private boolean completed;
    private Long assignedToEmployeeId;
}