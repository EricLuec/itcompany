package el.itcompany.entities.sectors;

public class IT_Sector implements  DefaultSector {
    String name;

    public IT_Sector(String name) {
        this.name = name;
    }

    @Override
    public boolean confidential() {
        return true;
    }
}
