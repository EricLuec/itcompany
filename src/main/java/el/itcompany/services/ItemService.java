package el.itcompany.services;

import el.itcompany.entities.Employee;
import el.itcompany.entities.Item;
import el.itcompany.repositories.EmployeeRepository;
import el.itcompany.repositories.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final EmployeeRepository employeeRepository;

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public Optional<Item> getItemById(Long id) {
        return itemRepository.findById(id);
    }

    public Item createItem(Item item) {
        return itemRepository.save(item);
    }


    public Item updateItem(Item updatedItem) {
        return itemRepository.findById(updatedItem.getId())
                .map(item -> {
                    item.setName(updatedItem.getName());
                    item.setDescription(updatedItem.getDescription());
                    item.setCategory(updatedItem.getCategory());
                    item.setPrice(updatedItem.getPrice());
                    item.setPurchaseDate(updatedItem.getPurchaseDate());
                    item.setInventory(updatedItem.getInventory());

                    if (updatedItem.getEmployee() != null && updatedItem.getEmployee().getId() != null) {
                        Employee emp = employeeRepository.findById(updatedItem.getEmployee().getId())
                                .orElseThrow(() -> new RuntimeException("Employee not found"));
                        item.setEmployee(emp);
                    } else {
                        item.setEmployee(null);
                    }

                    Item savedItem = itemRepository.save(item);

                    if (savedItem.getEmployee() != null) {
                        savedItem.getEmployee().getFirstName();
                    }

                    System.out.println("Returning item: " + savedItem);
                    System.out.println("Employee: " + savedItem.getEmployee());

                    return savedItem;
                }).orElseThrow(() -> new RuntimeException("Item not found"));
    }

    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }

}