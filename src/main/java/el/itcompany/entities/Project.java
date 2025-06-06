package el.itcompany.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Project {
    @Id
    @GeneratedValue
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