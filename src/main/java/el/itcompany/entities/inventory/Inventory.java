package el.itcompany.entities.inventory;

import el.itcompany.entities.people.Person;

public interface Inventory {
    void getItems();
    Item getItem(String name);
    void returnItem(Item item);
    void breakItemOnPurpose(Item item, Person person);
    void breakItemOnAccident(Item item);
    void purchaseItem(Item item);
}
