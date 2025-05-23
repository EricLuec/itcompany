package el.itcompany.entities.building;

import jakarta.persistence.*;

@Entity
@Table(name = "building")
public class DefaultBuilding {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private long id;

    @Column(name = "houseNumber")
    int houseNumber;

    @Column(name = "buildingName")
    String name;

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
