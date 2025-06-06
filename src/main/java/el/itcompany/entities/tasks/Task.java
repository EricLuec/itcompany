package el.itcompany.entities.tasks;

import el.itcompany.entities.people.Employee;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private boolean completed;

    @ManyToOne
    private Employee assignedTo;
}