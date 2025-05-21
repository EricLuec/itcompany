package el.itcompany.inventory;

public class DefaultItem implements Item {
    public String name;
    int purchaseCost;
    boolean available;

    public DefaultItem(String name, int purchaseCost, boolean available) {
        this.name = name;
        this.purchaseCost = purchaseCost;
        this.available = available;
    }
    public boolean getAvailable() {
        return this.available;
    }
}
