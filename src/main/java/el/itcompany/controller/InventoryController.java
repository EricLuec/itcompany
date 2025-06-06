package el.itcompany.controller;

import el.itcompany.entities.inventory.Inventory;
import el.itcompany.services.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventory")
@RequiredArgsConstructor
public class InventoryController {
    private final InventoryService inventoryService;

    @GetMapping
    public List<Inventory> listInventories() {
        return inventoryService.findAll();
    }

    @PostMapping("/new")
    public String saveEmployee(Inventory inventory) {
        inventoryService.newInventory(inventory);
        return "redirect:/";
    }
}
