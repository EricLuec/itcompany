package el.itcompany.controllers;

import el.itcompany.entities.CompanyBudget;
import el.itcompany.services.CompanyBudgetService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/budget")
public class CompanyBudgetController {

    private final CompanyBudgetService service;

    public CompanyBudgetController(CompanyBudgetService service) {
        this.service = service;
    }

    @GetMapping
    public CompanyBudget getBudget() {
        return service.getBudget();
    }

    @PostMapping("/add")
    public CompanyBudget addFunds(@RequestParam Double amount) {
        return service.addFunds(amount);
    }

    @PostMapping("/reserve")
    public CompanyBudget reserveFunds(@RequestParam Double amount) {
        return service.reserveFunds(amount);
    }

    @PostMapping("/debit")
    public CompanyBudget debitFunds(@RequestParam Double amount) {
        return service.debitFunds(amount);
    }

    @PostMapping("/release")
    public CompanyBudget releaseFunds(@RequestParam Double amount) {
        return service.releaseReservedFunds(amount);
    }
}
