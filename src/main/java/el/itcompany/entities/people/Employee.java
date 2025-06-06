package el.itcompany.entities.people;

import el.itcompany.entities.building.Building;
import el.itcompany.entities.inventory.Item;
import el.itcompany.entities.position.Position;
import el.itcompany.entities.sectors.DefaultSector;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)

    @Column(name = "age")
    private int age;

    @Column(name = "name")
    String name;

    @Transient
    @Column(name = "position")
    Position position;

    @Transient
    @Column(name = "manager")
    Manager manager;

    @Transient
    @Column(name = "items_in_posession")
    List<Item> itemsInPosession;

    @Transient
    @Column(name = "sector")
    DefaultSector sector;

    @Transient
    @Column(name = "workPlace")
    Building workPlace;

    @Column
    ArrayList<String> complaints = new ArrayList<>();

    public String reportPerson(String message) {
        this.complaints.add(message);
        return message;
    }

    public void listItemsInPosession() {
        if (!this.itemsInPosession.isEmpty()) {
            System.out.println("There are no items in posession");
        }
        for (Item i : this.itemsInPosession) {
            System.out.println(i);
        }
    }
}
