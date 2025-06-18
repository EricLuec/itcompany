package el.itcompany.repositories;

import el.itcompany.entities.CompanyBudget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyBudgetRepository extends JpaRepository<CompanyBudget, Long> {
}
