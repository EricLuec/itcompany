package el.itcompany.people;

import el.itcompany.building.DefaultBuilding;
import el.itcompany.inventory.DefaultItem;
import el.itcompany.inventory.Item;
import el.itcompany.sectors.IT_Sector;

import java.util.ArrayList;

public class DefaultPerson implements Person {
    int age;
    String name;
    Position position;
    Manager manager;
    ArrayList<Item> itemsInPosession = new ArrayList<>();
    IT_Sector sector;
    DefaultBuilding workPlace;

    public DefaultPerson(int age, String name, Position position, Manager manager, IT_Sector sector, DefaultBuilding workPlace) {
        this.age = age;
        this.name = name;
        this.position = position;
        this.manager = manager;
        this.sector = sector;
        this.workPlace = workPlace;
    }

    public DefaultPerson(int age, String name, Position position, IT_Sector sector, DefaultBuilding workPlace) {
        this.age = age;
        this.name = name;
        this.position = position;
        this.sector = sector;
        this.workPlace = workPlace;
    }

    @Override
    public String reportPerson(String message, Person person) {
        person.complaints.add(message);
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
    public boolean listItemsInPosession(DefaultPerson person) {
        if (person == null) {
            System.out.println("Person is not found");
            throw new IllegalArgumentException("Person is not found");
        } else if (person.itemsInPosession.isEmpty()) {
            System.out.println("There are no items in posession");
            return false;
        }
        for (DefaultItem i : person.itemsInPosession) {
            System.out.println(i.name);
        }
        return true;
    }
    
}
