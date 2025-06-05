package el.itcompany.entities.building;

import jakarta.persistence.*;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Building {

    @Id
    @GeneratedValue(strategy =  GenerationType.TABLE)
    int houseNumber;
    String name;

}
