package el.itcompany.services;

import el.itcompany.entities.CompanyBudget;
import el.itcompany.repositories.CompanyBudgetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompanyBudgetService {

    private final CompanyBudgetRepository repository;

    public CompanyBudget getBudget() {
        return repository.findById(1L)
                .orElseGet(() -> repository.save(new CompanyBudget()));
    }

    public CompanyBudget addFunds(Double amount) {
        CompanyBudget budget = getBudget();
        budget.setTotalFunds(budget.getTotalFunds() + amount);
        return repository.save(budget);
    }

    public CompanyBudget reserveFunds(Double amount) {
        CompanyBudget budget = getBudget();
        if (budget.getAvailableFunds() < amount) {
            throw new RuntimeException("Not enough available funds to reserve.");
        }
        budget.setReservedFunds(budget.getReservedFunds() + amount);
        return repository.save(budget);
    }

    public CompanyBudget debitFunds(Double amount) {
        CompanyBudget budget = getBudget();
        if (budget.getAvailableFunds() < amount) {
            throw new RuntimeException("Insufficient funds.");
        }
        budget.setTotalFunds(budget.getTotalFunds() - amount);
        return repository.save(budget);
    }

    public CompanyBudget releaseReservedFunds(Double amount) {
        CompanyBudget budget = getBudget();
        if (budget.getReservedFunds() < amount) {
            throw new RuntimeException("Not enough reserved funds to release.");
        }
        budget.setReservedFunds(budget.getReservedFunds() - amount);
        return repository.save(budget);
    }
}
