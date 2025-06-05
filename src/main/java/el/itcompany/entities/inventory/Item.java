package el.itcompany.entities.inventory;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Item implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    public String name;
    public int purchaseCost;
    public boolean available;

}
