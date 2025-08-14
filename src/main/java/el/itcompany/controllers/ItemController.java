package el.itcompany.controllers;

import el.itcompany.entities.Employee;
import el.itcompany.entities.Item;
import el.itcompany.services.EmployeeService;
import el.itcompany.services.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/items")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService, EmployeeService employeeService) {
        this.itemService = itemService;
    }

    @GetMapping
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        return itemService.getItemById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Item createItem(@RequestBody Item item) {
        return itemService.createItem(item);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item item) {
        try {
            item.setId(id);
            Item updatedItem = itemService.updateItem(item);

            System.out.println("Sending response: " + updatedItem);
            if (updatedItem.getEmployee() != null) {
                System.out.println("Employee in response: " + updatedItem.getEmployee().getFirstName());
            }

            return ResponseEntity.ok(updatedItem);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/simple")
    public ResponseEntity<String> getSimpleItem(@PathVariable Long id) {
        Optional<Item> itemOpt = itemService.getItemById(id);
        if (itemOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Item item = itemOpt.get();
        String result = String.format(
                "ID: %d, Name: %s, Employee: %s",
                item.getId(),
                item.getName(),
                item.getEmployee() != null ? item.getEmployee().getFirstName() : "null"
        );

        return ResponseEntity.ok(result);
    }

}
