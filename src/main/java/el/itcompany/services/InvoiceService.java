package el.itcompany.services;

import el.itcompany.entities.CompanyBudget;
import el.itcompany.entities.Invoice;
import el.itcompany.repositories.CompanyBudgetRepository;
import el.itcompany.repositories.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final CompanyBudgetRepository budgetRepository;

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    public Invoice getInvoiceById(Long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));
    }

    public List<Invoice> getInvoicesByBudget(Long budgetId) {
        return invoiceRepository.findByCompanyBudgetId(budgetId);
    }

    public Invoice createInvoice(Invoice invoice, Long budgetId) {
        CompanyBudget budget = budgetRepository.findById(budgetId)
                .orElseThrow(() -> new RuntimeException("Budget not found"));

        if (invoice.getTotalAmount() > budget.getAvailableFunds()) {
            throw new RuntimeException("Not enough available funds in the selected budget");
        }

        budget.setAvailableFunds(budget.getAvailableFunds() - invoice.getTotalAmount());
        budgetRepository.save(budget);

        invoice.setCompanyBudget(budget);
        return invoiceRepository.save(invoice);
    }

    public Invoice updateInvoice(Long id, Invoice updated) {
        return invoiceRepository.findById(id).map(existing -> {
            existing.setClient(updated.getClient());
            existing.setIssueDate(updated.getIssueDate());
            existing.setDueDate(updated.getDueDate());
            existing.setAmount(updated.getAmount());
            existing.setTax(updated.getTax());
            existing.setDiscount(updated.getDiscount());
            existing.setTotalAmount(updated.getTotalAmount());
            existing.setStatus(updated.getStatus());
            return invoiceRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Invoice not found"));
    }

    public void deleteInvoice(Long id) {
        invoiceRepository.deleteById(id);
    }

}
