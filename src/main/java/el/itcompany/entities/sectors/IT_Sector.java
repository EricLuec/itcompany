package el.itcompany.entities.sectors;

public class IT_Sector implements  DefaultSector {
    String name;

    public IT_Sector(String name) {
        this.name = name;
    }

    public boolean confidential() {
        return true;
    }
}
