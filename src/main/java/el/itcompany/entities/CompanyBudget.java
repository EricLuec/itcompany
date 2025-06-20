package el.itcompany.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Getter
@Setter
public class CompanyBudget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private Double totalFunds;
    private Double reservedFunds;
    private Double availableFunds;

    @OneToMany(mappedBy = "companyBudget", cascade = CascadeType.ALL)
    private List<Invoice> invoices = new ArrayList<>();


}