package el.itcompany.controllers;

import el.itcompany.entities.Inventory;
import el.itcompany.entities.Item;
import el.itcompany.services.InventoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventory")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping
    public List<Inventory> getAllProjects() {
        return inventoryService.getAllInventories();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inventory> getInventoryById(@PathVariable Long id) {
        return inventoryService.getInventoryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Inventory createInventory(@RequestBody Inventory inventory) {
        return inventoryService.createInventory(inventory);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Inventory> updateProject(@PathVariable Long id, @RequestBody Inventory inventory) {
        try {
            return ResponseEntity.ok(inventoryService.updateInventory(id, inventory));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        inventoryService.deleteInventory(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{inventoryId}/items")
    public ResponseEntity<Inventory> addItem(@PathVariable Long inventoryId, @RequestBody Item item) {
        return ResponseEntity.ok(inventoryService.addItemToInventory(inventoryId, item));
    }

    @DeleteMapping("/{inventoryId}/items/{itemId}")
    public ResponseEntity<Inventory> removeItem(@PathVariable Long inventoryId, @PathVariable Long itemId) {
        return ResponseEntity.ok(inventoryService.removeItemFromInventory(inventoryId, itemId));
    }

    @GetMapping("/{inventoryId}/items")
    public ResponseEntity<List<Item>> getItems(@PathVariable Long inventoryId) {
        return ResponseEntity.ok(inventoryService.getItemsOfInventory(inventoryId));
    }

}