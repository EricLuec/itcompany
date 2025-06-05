package el.itcompany.services;

import el.itcompany.entities.inventory.DefaultInventory;
import el.itcompany.entities.inventory.Inventory;
import el.itcompany.repositories.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class InventoryService {
    private final InventoryRepository inventoryRepository;

    public List<Inventory> findAll() {
        return inventoryRepository.findAll();
    }
}
