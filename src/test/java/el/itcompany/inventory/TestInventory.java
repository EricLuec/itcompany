package el.itcompany.inventory;

import el.itcompany.Building.DefaultBuilding;
import el.itcompany.inventory.DefaultItem;
import el.itcompany.people.Manager;
import el.itcompany.people.Position;
import el.itcompany.sectors.IT_Sector;
import org.junit.jupiter.api.Test;

import static el.itcompany.Building.DefaultBuilding.BuildingType.Office;
import static org.junit.jupiter.api.Assertions.*;

public class TestInventory {
    Position SWE = new Position(100000, "Software Dev", 2);
    Position Designer = new Position(150000, "UI/UX", 2);
    Position Manager = new Position(200000, "Manager", 3);

    IT_Sector architecture = new IT_Sector("architecture");
    DefaultBuilding sweBuilding = new DefaultBuilding(10, "sweBuilding", Office);

    Manager sweSeniorManager = new Manager(30, "benji", Manager, architecture, sweBuilding);
    Manager sweManager = new Manager(31, "testManager", Manager, sweSeniorManager ,architecture, sweBuilding);

    DefaultItem keyboard = new DefaultItem("Keyboard MX", 100, true);
    DefaultItem mouse = new DefaultItem("Master 3s", 100, true);
    DefaultItem mouseTwo = new DefaultItem("Master 4s", 100, false);

    DefaultInventory hardwareInventory = new DefaultInventory("Hardware Inventory", sweBuilding, sweManager);
    @Test
    public void testInventoryItems() {
        hardwareInventory.

    }
}
