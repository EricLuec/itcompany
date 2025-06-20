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

    private final CompanyBudgetRepository companyBudgetRepository;

    public List<CompanyBudget> getAllCompanyBudgets() {
        return companyBudgetRepository.findAll();
    }

    public Optional<CompanyBudget> getCompanyBudgetById(Long id) {
        return companyBudgetRepository.findById(id);
    }

    public CompanyBudget createCompanyBudget(CompanyBudget companyBudget) {
        return companyBudgetRepository.save(companyBudget);
    }

    public CompanyBudget updateCompanyBudget(Long id, CompanyBudget companyBudget) {
        return companyBudgetRepository.findById(id)
                .map(newCompanyBudget -> {
                    newCompanyBudget.setName(companyBudget.getName());
                    //project.setStartDate(projectDetails.getStartDate());
                    //project.setEndDate(projectDetails.getEndDate());
                    //project.setBudget(projectDetails.getBudget());
                    // project.setStatus(projectDetails.getStatus());
                    // project.setCustomer(projectDetails.getCustomer());
                    // project.setEmployees(projectDetails.getEmployees());
                    return companyBudgetRepository.save(companyBudget);
                })
                .orElseThrow(() -> new RuntimeException("Company Budget not found"));
    }

    public void deleteCompanyBudget(Long id) {
        companyBudgetRepository.deleteById(id);
    }

}