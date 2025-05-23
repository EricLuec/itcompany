package el.itcompany.entities.inventory;

public interface Item {
    boolean getAvailable();
    int getPurchaseCost();
    Item getItem();
}
