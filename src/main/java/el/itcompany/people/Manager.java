package el.itcompany.people;

import el.itcompany.Building.DefaultBuilding;
import el.itcompany.inventory.DefaultItem;
import el.itcompany.sectors.IT_Sector;

public class Manager extends DefaultPerson {

    public Manager(int age, String name, Position position, Manager manager, IT_Sector sector, DefaultBuilding workPlace) {
        super(age, name, position, manager, sector, workPlace);
    }

    public Manager(int age, String name, Position position, IT_Sector sector, DefaultBuilding workPlace) {
        super(age, name, position, sector, workPlace);
    }

    public String alterPosition(DefaultPerson person, Position NewPosition) {
        person.position = NewPosition;
        return person.position.toString();
    }

    public boolean grantItem(DefaultItem item, DefaultPerson person) {
        if (item.getAvailable() == false || item == null) {
            System.out.println("Item not found or not available.");
            return false;
        }
        person.itemsInPosession.add(item);
        System.out.println("Item has been granted.");
        System.out.println("current items in posession: " + person.itemsInPosession.toString() + " items in posession");
        return true;
    }

    public boolean revokeItem(DefaultItem item, DefaultPerson person) {
        if (item.getAvailable() == true || item == null) {
            System.out.println("Item not found or not available.");
            return false;
        }

        person.itemsInPosession.remove(item);
        System.out.println("Item has been removed.");
        System.out.println("current items in posession: " + person.itemsInPosession.toString() + " items in posession");
        return true;
    }


}
