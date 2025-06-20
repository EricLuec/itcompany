package el.itcompany.services;

import el.itcompany.entities.Employee;
import el.itcompany.entities.Inventory;
import el.itcompany.entities.Item;
import el.itcompany.repositories.InventoryRepository;
import el.itcompany.repositories.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository inventoryRepository;
    private final ItemRepository itemRepository;

    public List<Inventory> getAllInventories() {
        return inventoryRepository.findAll();
    }

    public Optional<Inventory> getInventoryById(Long id) {
        return inventoryRepository.findById(id);
    }

    public Inventory createInventory(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    public Inventory updateInventory(Long id, Inventory inventoryDetails) {
        return inventoryRepository.findById(id)
                .map(inventory -> {
                    inventory.setName(inventoryDetails.getName());
                    //project.setStartDate(projectDetails.getStartDate());
                    //project.setEndDate(projectDetails.getEndDate());
                    //project.setBudget(projectDetails.getBudget());
                    // project.setStatus(projectDetails.getStatus());
                    // project.setCustomer(projectDetails.getCustomer());
                    // project.setEmployees(projectDetails.getEmployees());
                    return inventoryRepository.save(inventory);
                })
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }

    public void deleteInventory(Long id) {
        inventoryRepository.deleteById(id);
    }

    public Inventory addItemToInventory(Long inventoryId, Item item) {
        Inventory inventory = inventoryRepository.findById(inventoryId)
                .orElseThrow(() -> new RuntimeException("Inventory not found"));

        item.setInventory(inventory);
        inventory.getItems().add(item);

        return inventoryRepository.save(inventory);
    }

    public Inventory removeItemFromInventory(Long inventoryId, Long itemId) {
        Inventory inventory = inventoryRepository.findById(inventoryId)
                .orElseThrow(() -> new RuntimeException("Inventory not found"));
        inventory.getItems().removeIf(item -> item.getId().equals(itemId));
        return inventoryRepository.save(inventory);
    }

    public List<Item> getItemsOfInventory(Long inventoryId) {
        Inventory inventory = inventoryRepository.findById(inventoryId)
                .orElseThrow(() -> new RuntimeException("Inventory not found"));
        return inventory.getItems();
    }

    public Inventory setNewResponsibleEmployee(Long inventoryId, Employee responsibleEmployee) {
        return inventoryRepository.findById(inventoryId).map(
                inventory -> {
                    inventory.setResponsibleEmployee(responsibleEmployee);
                    return inventoryRepository.save(inventory);
                }).orElseThrow(() -> new RuntimeException("Project not found"));
    }
}