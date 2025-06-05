package el.itcompany.entities.people;

import el.itcompany.entities.building.DefaultBuilding;
import el.itcompany.entities.inventory.Item;
import el.itcompany.entities.position.Position;
import el.itcompany.entities.sectors.IT_Sector;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DefaultPerson implements Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int age;
    String name;
    @Transient
    Position position;
    @Transient
    Manager manager;
    ArrayList<Item> itemsInPosession = new ArrayList<>();
    @Transient
    IT_Sector sector;
    @Transient
    DefaultBuilding workPlace;
    ArrayList<String> complaints = new ArrayList<>();

    @Override
    public String reportPerson(String message) {
        this.complaints.add(message);
        return message;
    }

    @Override
    public boolean isOpenForWork() {
        return false;
    }

    @Override
    public Manager getManager() {
        return this.manager;
    }

    @Override
    public void listItemsInPosession() {
        if (!this.itemsInPosession.isEmpty()) {
            System.out.println("There are no items in posession");
        }
        for (Item i : this.itemsInPosession) {
            System.out.println(i);
        }
    }

}
