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

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class DefaultInventory implements Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    String name;
    @Transient
    DefaultBuilding building;
    @Transient
    Manager manager;
    ArrayList<Item> items = new ArrayList<>();


    @Override
    public void getItems() {
        for (Item item : items) {
            System.out.println(item.toString());
        }
    }

    @Override
    public Item getItem(String name) {
        Item carrierItem = null;
        for (Item item : items) {
            if (item.toString().equals(name)) {
                carrierItem = item;
            } else {
                System.out.println(name + " has not been found");
                throw new ItemNotFound("Item " + name + " not found");
            }
        }
        return carrierItem;
    }

    @Override
    public void returnItem(Item item) {
        if (!item.getAvailable()) {
            System.out.println(item + " is already in storage");
        } else {
            System.out.println(item + " has been returned");
        }
    }

    @Override
    public void breakItemOnPurpose(Item item, Person person) {
        items.remove(item);
        purchaseItem(item);
        System.out.println("due to irresponsibility, your manager" + person.getManager() + " will be informed.");
        person.reportPerson(item + "has been broken by " + person + " on purpose");
    }

    @Override
    public void breakItemOnAccident(Item item) {
        items.remove(item);
        purchaseItem(item);
        System.out.println("better watch out next time");
    }

    @Override
    public void purchaseItem(Item item) {
        items.add(item);
        System.out.println(item + " purchased for" + item.getPurchaseCost());
    }
}
