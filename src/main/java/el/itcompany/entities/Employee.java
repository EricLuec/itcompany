package el.itcompany.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@Getter
@Setter
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private int salary;

    @Transient
    private Sector sector;

    private String manager;
    private List<String> complaints;
    private LocalDate hireDate;
    // private LocalDate vacation;
    private List<String> warnings;
    private List<String> items;
    
}
