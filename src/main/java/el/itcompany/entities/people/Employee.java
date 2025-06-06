package el.itcompany.entities.people;

import el.itcompany.entities.building.Building;
import el.itcompany.entities.position.Position;
import el.itcompany.entities.sectors.Sector;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String vorname;
    private String nachname;
    private String email;

    @ManyToOne
    private Building building;

    @ManyToOne
    private Position position;

    @ManyToOne
    private Sector sector;
}
