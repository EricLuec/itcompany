package el.itcompany.entities.sectors;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DefaultSector {
    @Id
    @GeneratedValue(strategy =  GenerationType.TABLE)
    String name;

}
