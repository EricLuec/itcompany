package el.itcompany.people;

import el.itcompany.Building.DefaultBuilding;
import el.itcompany.inventory.DefaultItem;
import el.itcompany.sectors.IT_Sector;

import java.util.ArrayList;

public class DefaultPerson implements Person {
    int age;
    String name;
    Position position;
    Manager manager;
    ArrayList<String> complaints = new ArrayList<String>();
    ArrayList<DefaultItem> itemsInPosession = new ArrayList<DefaultItem>();
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

    public String reportPerson(String message, DefaultPerson person) {
        person.complaints.add(message);
        return message;
    }
    
    @Override
    public boolean isOpenForWork() {
        return false;
    }

    public Manager getManager() {
        return this.manager;
    }

    public boolean listItemsInPosession(DefaultPerson person) {
        if (person == null) {
            System.out.println("Person is not found");
            return false;
        } else if (person.itemsInPosession.size() == 0) {
            System.out.println("There are no items in posession");
            return false;
        }
        for (DefaultItem i : person.itemsInPosession) {
            System.out.println(i.name.toString());
        }
        return true;
    }
    
}
