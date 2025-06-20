package el.itcompany.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@Getter
@Setter
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private String manager;
    private LocalDate creationDate;
    private List<String> workerList;

    enum ProjectStatus {
        PLANNED, ACTIVE, COMPLETED
    }

    @ManyToMany
    private List<Employee> employees;

    private LocalDate startDate;
    private LocalDate endDate;
    private int budget;

    @Enumerated(EnumType.STRING)
    private ProjectStatus status;
}