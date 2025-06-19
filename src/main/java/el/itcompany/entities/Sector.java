package el.itcompany.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Data
@Entity
@Getter
@Setter
public class Sector implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    enum SalaryClass {
        A, B, C, D
    }

    @Enumerated(EnumType.STRING)
    private Sector.SalaryClass salaryClass;
}
