package el.itcompany.entities.sectors;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class IT_Sector implements  DefaultSector {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    String name;

    public boolean confidential() {
        return true;
    }
}
