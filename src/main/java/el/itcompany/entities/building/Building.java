package el.itcompany.entities.building;

import el.itcompany.entities.people.Employee;
import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = "employees") // Avoid circular reference in toString
@EqualsAndHashCode(exclude = "employees") // Avoid circular reference in equals/hashCode
public class Building {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String address;

    @OneToMany(mappedBy = "building")
    @JsonIgnore // Prevent JSON serialization issues
    private List<Employee> employees;
}