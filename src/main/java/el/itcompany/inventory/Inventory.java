package el.itcompany.inventory;

import el.itcompany.people.DefaultPerson;

public interface Inventory {
    void getItems();
    void getItem(String name);
    void returnItem(DefaultItem item);
    void breakItemOnPurpose(DefaultItem item, DefaultPerson person);
    void breakItemOnAccident(DefaultItem item);
    void purchaseItem(DefaultItem item);

}
