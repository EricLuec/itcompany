package el.itcompany.Building;

public class DefaultBuilding {
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
}
