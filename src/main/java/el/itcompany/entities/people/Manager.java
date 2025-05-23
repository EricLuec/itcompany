package el.itcompany.entities.people;

import el.itcompany.entities.building.DefaultBuilding;
import el.itcompany.entities.inventory.DefaultItem;
import el.itcompany.entities.inventory.Item;
import el.itcompany.entities.position.Position;
import el.itcompany.entities.sectors.IT_Sector;

import java.util.ArrayList;

public class Manager extends DefaultPerson {

    public Manager(int age, String name, Position position, Manager manager, IT_Sector sector, DefaultBuilding workPlace, ArrayList<String> complaints, ArrayList<Item> itemsInPosession) {
        super(age, name, position, manager, sector, workPlace, complaints, itemsInPosession);
    }

    public Manager(int age, String name, Position position, IT_Sector sector, DefaultBuilding workPlace, ArrayList<String> complaints, ArrayList<Item> itemsInPosession) {
        super(age, name, position, sector, workPlace, complaints, itemsInPosession);
    }

    public String alterPosition(DefaultPerson person, Position NewPosition) {
        person.position = NewPosition;
        return person.position.toString();
    }

    public boolean grantItem(DefaultItem item, DefaultPerson person) {
        if (!item.getAvailable() || item == null) {
            System.out.println("Item not found or not available.");
            return false;
        }
        person.itemsInPosession.add(item);
        System.out.println("Item has been granted.");
        System.out.println("current items in posession: " + person.itemsInPosession.toString() + " items in posession");
        return true;
    }

    public boolean revokeItem(DefaultItem item, DefaultPerson person) {
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
