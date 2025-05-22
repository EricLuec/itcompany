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

    @Override
    public boolean getAvailable() {
        return this.available;
    }

    @Override
    public int getPurchaseCost() {
        return this.purchaseCost;
    }
}
