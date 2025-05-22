package el.itcompany.building;

public class DefaultBuilding implements Building {
    int houseNumber;
    String name;
    public enum BuildingType {
        Office,
        Storage,
        ConferenceHall
    }

    public DefaultBuilding(int houseNumber, String name, BuildingType type) {
        this.houseNumber = houseNumber;
        this.name = name;
    }

    public int getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(int houseNumber) {
        this.houseNumber = houseNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
