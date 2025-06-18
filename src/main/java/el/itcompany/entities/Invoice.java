package el.itcompany.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Data
@Entity
@Getter
@Setter
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String client;

    @ManyToOne
    private Project project;

    private LocalDate issueDate;
    private LocalDate dueDate;

    private Double amount;
    private Double tax;
    private Double discount;
    private Double totalAmount;

    @Enumerated(EnumType.STRING)
    private InvoiceStatus status;

    public enum InvoiceStatus {
        DRAFT, SENT, PAID, OVERDUE
    }
}
