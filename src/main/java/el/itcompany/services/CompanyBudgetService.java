package el.itcompany.services;

import el.itcompany.entities.CompanyBudget;
import el.itcompany.repositories.CompanyBudgetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CompanyBudgetService {

    private final CompanyBudgetRepository budgetRepository;


    public List<CompanyBudget> getAllBudgets() {
        return budgetRepository.findAll();
    }

    public Optional<CompanyBudget> getBudgetById(Long id) {
        return budgetRepository.findById(id);
    }

    public CompanyBudget createBudget(CompanyBudget budget) {
        // Set availableFunds initially to totalFunds - reservedFunds
        if (budget.getAvailableFunds() == null) {
            budget.setAvailableFunds(budget.getTotalFunds() - budget.getReservedFunds());
        }
        return budgetRepository.save(budget);
    }

    public CompanyBudget updateBudget(Long id, CompanyBudget updated) {
        return budgetRepository.findById(id).map(existing -> {
            existing.setName(updated.getName());
            existing.setDescription(updated.getDescription());
            existing.setTotalFunds(updated.getTotalFunds());
            existing.setReservedFunds(updated.getReservedFunds());
            existing.setAvailableFunds(updated.getAvailableFunds());
            return budgetRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Budget not found"));
    }

    public void deleteBudget(Long id) {
        budgetRepository.deleteById(id);
    }
}
