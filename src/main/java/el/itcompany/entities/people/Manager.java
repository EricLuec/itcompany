package el.itcompany.entities.people;

import el.itcompany.entities.building.DefaultBuilding;
import el.itcompany.entities.inventory.Item;
import el.itcompany.entities.position.Position;
import el.itcompany.entities.sectors.IT_Sector;

import java.util.ArrayList;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Manager extends DefaultPerson {
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

    public String alterPosition(DefaultPerson person, Position NewPosition) {
        person.position = NewPosition;
        return person.position.toString();
    }

    public boolean grantItem(Item item, DefaultPerson person) {
        if (!item.getAvailable() || item == null) {
            System.out.println("Item not found or not available.");
            return false;
        }
        person.itemsInPosession.add(item);
        System.out.println("Item has been granted.");
        System.out.println("current items in posession: " + person.itemsInPosession.toString() + " items in posession");
        return true;
    }

    public boolean revokeItem(Item item, DefaultPerson person) {
        if (item.getAvailable() || item == null) {
            System.out.println("Item not found or not available.");
            return false;
        }

        person.itemsInPosession.remove(item);
        System.out.println("Item has been removed.");
        System.out.println("current items in posession: " + person.itemsInPosession.toString() + " items in posession");
        return true;
    }
}
