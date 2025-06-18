package el.itcompany.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Getter
@Setter
public class CompanyBudget {
    @Id
    private Long id = 1L; // Singleton

    private Double totalFunds;
    private Double reservedFunds;
    private Double availableFunds;

}