package el.itcompany.entities.inventory;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DefaultItem implements Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public String name;
    int purchaseCost;
    boolean available;

    @Override
    public boolean getAvailable() {
        return this.available;
    }

    @Override
    public int getPurchaseCost() {
        return this.purchaseCost;
    }

    @Override
    public Item getItem() {
        return this;
    }
}
