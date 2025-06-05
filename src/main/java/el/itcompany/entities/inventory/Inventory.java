package el.itcompany.entities.inventory;

import el.itcompany.entities.building.Building;
import el.itcompany.exceptions.ItemNotFound;
import el.itcompany.entities.people.Manager;
import el.itcompany.entities.people.Person;

import java.util.ArrayList;
import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
     private String name;

    @Transient
    private Building building;

    @Transient
    private Manager manager;

    @Transient
    private ArrayList<Item> items = new ArrayList<>();

    public void getItems() {
        System.out.println("All items:");
        if (items.isEmpty()) {
            System.out.println("No items available.");
        } else {
            for (Item item : items) {
                System.out.println(item);
            }
        }
    }

    public String getItem(String name) {
        for (Item item : items) {
            if (item.toString().equals(name)) {
                return item.toString();
            }
        }
        System.out.println(name + " has not been found");
        throw new ItemNotFound("Item " + name + " not found");
    }

    public void returnItem(Item item) {
        if (item.available) {
            System.out.println(item + " has been returned");
            item.setAvailable(true);  // Assuming returning makes it available again.
        } else {
            System.out.println(item + " is already in storage");
        }
    }

    public void breakItemOnPurpose(Item item, Person person) {
        items.remove(item);
        purchaseItem(item);
        System.out.println("Due to irresponsibility, your manager " + person.getManager() + " will be informed.");
        person.reportPerson(item + " has been broken on purpose by " + person);
    }


    public void breakItemOnAccident(Item item) {
        items.remove(item);
        purchaseItem(item);
        System.out.println("Better watch out next time");
    }

    public void purchaseItem(Item item) {
        items.add(item);
        System.out.println(item + " purchased for " + item.getPurchaseCost());
    }
}
