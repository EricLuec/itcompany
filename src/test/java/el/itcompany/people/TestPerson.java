package el.itcompany.people;

import el.itcompany.building.DefaultBuilding;
import el.itcompany.sectors.IT_Sector;
import org.junit.jupiter.api.Test;

import static el.itcompany.building.DefaultBuilding.BuildingType.Office;
import static org.junit.jupiter.api.Assertions.*;

public class TestPerson {
    Position SWE = new Position(100000, "Software Dev", 2);
    Position Manager = new Position(200000, "Manager", 3);

    IT_Sector architecture = new IT_Sector("architecture");

    DefaultBuilding sweBuilding = new DefaultBuilding(10, "sweBuilding", Office);

    Manager sweSeniorManager = new Manager(30, "benji", Manager, architecture, sweBuilding);
    Manager sweManager = new Manager(31, "testManager", Manager, sweSeniorManager ,architecture, sweBuilding);

    @Test
    public void testPersonConstructor() {
        DefaultPerson person = new DefaultPerson(20, "eric", SWE, sweManager, architecture, sweBuilding);

        assertEquals(0, person.complaints.size());
        assertEquals("eric", person.name);
    }

    @Test
    public void reportPerson() {
        DefaultPerson person = new DefaultPerson(20, "eric", SWE, sweManager, architecture, sweBuilding);
        DefaultPerson personTwo = new DefaultPerson(17, "nick", SWE, sweManager, architecture, sweBuilding);

        assertEquals("didnt read the log", personTwo.reportPerson("didnt read the log", person));
        assertEquals(1, person.complaints.size());
        assertEquals("didnt read the log twice", personTwo.reportPerson("didnt read the log twice", person));
        assertEquals("[didnt read the log, didnt read the log twice]", person.complaints.toString());
    }
}
