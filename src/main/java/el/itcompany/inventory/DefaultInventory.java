package el.itcompany.inventory;

import el.itcompany.Building.DefaultBuilding;
import el.itcompany.people.DefaultPerson;
import el.itcompany.people.Manager;

import java.util.ArrayList;

public class DefaultInventory implements Inventory {
    String name;
    DefaultBuilding building;
    Manager manager;
    ArrayList<DefaultItem> items = new ArrayList<DefaultItem>();

    public DefaultInventory(String name, DefaultBuilding building, Manager manager) {
        this.name = name;
        this.building = building;
        this.manager = manager;
    }

    @Override
    public void getItems() {
        for (DefaultItem item : items) {
            System.out.println(item.toString());
        }
    }

    @Override
    public void getItem(String name) {
        for (DefaultItem item : items) {
            if (item.toString().equals(name)) {
                System.out.println(item);
            } else {
                System.out.println(name + " has not been found");
            }
        }
    }

    @Override
    public void returnItem(DefaultItem item) {
        if (!item.available) {
            System.out.println(item + " is already in storage");
        } else {
            System.out.println(item + " has been returned");
        }
    }

    @Override
    public void breakItemOnPurpose(DefaultItem item, DefaultPerson person) {
        items.remove(item);
        purchaseItem(item);
        System.out.println("due to irresponsibility, your manager" + person.getManager() + " will be informed." );
        person.reportPerson(item + "has been broken by " + person + " on purpose", person);
    }

    @Override
    public void breakItemOnAccident(DefaultItem item) {
        items.remove(item);
        purchaseItem(item);
        System.out.println("better watch out next time");
    }

    @Override
    public void purchaseItem(DefaultItem item) {
        items.add(item);
        System.out.println(item + " purchased for" + item.purchaseCost);
    }


}
