package el.itcompany.controllers;

import el.itcompany.entities.CompanyBudget;
import el.itcompany.services.CompanyBudgetService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/companyBudget")
public class CompanyBudgetController {

    private final CompanyBudgetService budgetService;

    public CompanyBudgetController(CompanyBudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @GetMapping
    public List<CompanyBudget> getAllBudgets() {
        return budgetService.getAllBudgets();
    }

    @GetMapping("/{id}")
    public CompanyBudget getBudgetById(@PathVariable Long id) {
        return budgetService.getBudgetById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found"));
    }

    @PostMapping
    public CompanyBudget createBudget(@RequestBody CompanyBudget budget) {
        return budgetService.createBudget(budget);
    }

    @PutMapping("/{id}")
    public CompanyBudget updateBudget(@PathVariable Long id, @RequestBody CompanyBudget budget) {
        return budgetService.updateBudget(id, budget);
    }

    @DeleteMapping("/{id}")
    public void deleteBudget(@PathVariable Long id) {
        budgetService.deleteBudget(id);
    }
}
