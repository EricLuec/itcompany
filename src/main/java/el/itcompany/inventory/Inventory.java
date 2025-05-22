package el.itcompany.inventory;

import el.itcompany.people.Person;

public interface Inventory {
    void getItems();
    Item getItem(String name);
    void returnItem(Item item);
    void breakItemOnPurpose(Item item, Person person);
    void breakItemOnAccident(Item item);
    void purchaseItem(Item item);

}
