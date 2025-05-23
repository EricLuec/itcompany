package el.itcompany.entities.people;

import el.itcompany.entities.building.DefaultBuilding;
import el.itcompany.entities.inventory.Item;
import el.itcompany.entities.position.Position;
import el.itcompany.entities.sectors.IT_Sector;

import java.util.ArrayList;

public class DefaultPerson implements Person {
    int age;
    String name;
    Position position;
    Manager manager;
    ArrayList<Item> itemsInPosession = new ArrayList<>();
    IT_Sector sector;
    DefaultBuilding workPlace;
    ArrayList<String> complaints = new ArrayList<>();

    public DefaultPerson(int age, String name, Position position, Manager manager, IT_Sector sector, DefaultBuilding workPlace, ArrayList<String> complaints, ArrayList<Item> itemsInPosession) {
        this.age = age;
        this.name = name;
        this.position = position;
        this.manager = manager;
        this.sector = sector;
        this.workPlace = workPlace;
        this.complaints = complaints;
        this.itemsInPosession = itemsInPosession;
    }

    public DefaultPerson(int age, String name, Position position, IT_Sector sector, DefaultBuilding workPlace, ArrayList<String> complaints, ArrayList<Item> itemsInPosession) {
        this.age = age;
        this.name = name;
        this.position = position;
        this.sector = sector;
        this.workPlace = workPlace;
        this.complaints = complaints;
        this.itemsInPosession = itemsInPosession;
    }

    @Override
    public String reportPerson(String message) {
        this.complaints.add(message);
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
    public void listItemsInPosession() {
        if (!this.itemsInPosession.isEmpty()) {
            System.out.println("There are no items in posession");
        }
        for (Item i : this.itemsInPosession) {
            System.out.println(i.getItem());
        }
    }

}
