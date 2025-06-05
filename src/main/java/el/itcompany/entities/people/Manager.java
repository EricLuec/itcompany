package el.itcompany.entities.people;

import el.itcompany.entities.building.Building;
import el.itcompany.entities.inventory.Item;
import el.itcompany.entities.position.Position;
import java.util.ArrayList;

import el.itcompany.entities.sectors.DefaultSector;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Manager extends Person {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private int age;
    String name;
    @Transient
    Position position;
    @Transient
    Manager manager;
    @Transient
    ArrayList<Item> itemsInPosession = new ArrayList<>();
    @Transient
    DefaultSector sector;
    @Transient
    Building workPlace;
    ArrayList<String> complaints = new ArrayList<>();

    /*
    public String alterPosition(DefaultPerson person, Position NewPosition) {
        person.position = NewPosition;
        return person.position.toString();
    }

    public boolean grantItem(Item item, DefaultPerson person) {
        if (!item.isAvailable() || item == null) {
            System.out.println("Item not found or not available.");
            return false;
        }
        person.itemsInPosession.add(item);
        System.out.println("Item has been granted.");
        System.out.println("current items in posession: " + person.itemsInPosession.toString() + " items in posession");
        return true;
    }

    public boolean revokeItem(Item item, DefaultPerson person) {
        if (item.isAvailable() || item == null) {
            System.out.println("Item not found or not available.");
            return false;
        }

        person.itemsInPosession.remove(item);
        System.out.println("Item has been removed.");
        System.out.println("current items in posession: " + person.itemsInPosession.toString() + " items in posession");
        return true;
    }

     */
}
