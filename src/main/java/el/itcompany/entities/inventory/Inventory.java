package el.itcompany.entities.inventory;

import el.itcompany.entities.building.DefaultBuilding;
import el.itcompany.exceptions.ItemNotFound;
import el.itcompany.entities.people.Manager;
import el.itcompany.entities.people.Person;

import java.util.ArrayList;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String name;

    @Transient
    private DefaultBuilding building;

    @Transient
    private Manager manager;

    @Transient
    private ArrayList<Item> items = new ArrayList<>();

    @Override
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

    @Override
    public String getItem(String name) {
        for (Item item : items) {
            if (item.toString().equals(name)) {
                return item.toString();
            }
        }
        System.out.println(name + " has not been found");
        throw new ItemNotFound("Item " + name + " not found");
    }

    // Method to return an item (if it's available or not)
    @Override
    public void returnItem(Item item) {
        if (item.getAvailable()) {
            System.out.println(item + " has been returned");
            item.setAvailable(true);  // Assuming returning makes it available again.
        } else {
            System.out.println(item + " is already in storage");
        }
    }

    // Method to break an item intentionally
    @Override
    public void breakItemOnPurpose(Item item, Person person) {
        items.remove(item);  // Remove the item from the inventory
        purchaseItem(item);  // Purchase a new item to replace it
        System.out.println("Due to irresponsibility, your manager " + person.getManager() + " will be informed.");
        person.reportPerson(item + " has been broken on purpose by " + person);
    }

    // Method to break an item by accident
    @Override
    public void breakItemOnAccident(Item item) {
        items.remove(item);
        purchaseItem(item);  // Replace the item
        System.out.println("Better watch out next time");
    }

    // Method to purchase a new item
    @Override
    public void purchaseItem(Item item) {
        items.add(item);
        System.out.println(item + " purchased for " + item.getPurchaseCost());
    }
}
