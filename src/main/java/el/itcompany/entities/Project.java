package el.itcompany.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Data
@Entity
@Getter
@Setter
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    enum ProjectStatus {
        PLANNED, ACTIVE, COMPLETED
    }
    /*
    @ManyToOne
    private Customer customer;

    @ManyToMany
    private List<Employee> employees;
*/
    private LocalDate startDate;
    private LocalDate endDate;
    private int budget;

    @Enumerated(EnumType.STRING)
    private ProjectStatus status;
}