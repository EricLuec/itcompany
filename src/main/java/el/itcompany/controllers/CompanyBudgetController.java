package el.itcompany.controllers;

import el.itcompany.entities.CompanyBudget;
import el.itcompany.services.CompanyBudgetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/items")
public class CompanyBudgetController {

    private final CompanyBudgetService companyBudgetService;

    public CompanyBudgetController(CompanyBudgetService companyBudgetService) {
        this.companyBudgetService = companyBudgetService;
    }

    @GetMapping
    public List<CompanyBudget> getAllCompaniesBudgets() {
        return companyBudgetService.getAllCompanyBudgets();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompanyBudget> getCompanyBudgetById(@PathVariable Long id) {
        return companyBudgetService.getCompanyBudgetById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public CompanyBudget createCompanyBudget(@RequestBody CompanyBudget companyBudget) {
        return companyBudgetService.createCompanyBudget(companyBudget);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CompanyBudget> updateCompanyBudget(@PathVariable Long id, @RequestBody CompanyBudget comapnyBudget) {
        try {
            return ResponseEntity.ok(companyBudgetService.updateCompanyBudget(id, comapnyBudget));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        companyBudgetService.deleteCompanyBudget(id);
        return ResponseEntity.noContent().build();
    }
}