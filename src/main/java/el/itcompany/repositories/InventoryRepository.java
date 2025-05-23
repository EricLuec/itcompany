package el.itcompany.repositories;

import el.itcompany.entities.inventory.Inventory;
import org.springframework.data.repository.CrudRepository;

public interface InventoryRepository extends CrudRepository<Inventory, Integer> {
}
