package el.itcompany.services;

import el.itcompany.entities.Invoice;
import el.itcompany.repositories.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final CompanyBudgetService companyBudgetService;

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    public Invoice getInvoiceById(Long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));
    }

    public Invoice createInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    public Invoice updateInvoice(Long id, Invoice updatedInvoice) {
        Invoice invoice = getInvoiceById(id);
        invoice.setClient(updatedInvoice.getClient());
        invoice.setProject(updatedInvoice.getProject());
        invoice.setIssueDate(updatedInvoice.getIssueDate());
        invoice.setDueDate(updatedInvoice.getDueDate());
        invoice.setAmount(updatedInvoice.getAmount());
        invoice.setTax(updatedInvoice.getTax());
        invoice.setDiscount(updatedInvoice.getDiscount());
        invoice.setTotalAmount(updatedInvoice.getTotalAmount());
        invoice.setStatus(updatedInvoice.getStatus());
        return invoiceRepository.save(invoice);
    }

    public void deleteInvoice(Long id) {
        invoiceRepository.deleteById(id);
    }

    public Invoice payInvoice(Long id) {
        Invoice invoice = getInvoiceById(id);
        if (invoice.getStatus() == Invoice.InvoiceStatus.PAID) {
            throw new RuntimeException("Invoice already paid");
        }
        // Budget prüfen und abziehen
        companyBudgetService.debitFunds(invoice.getTotalAmount());
        invoice.setStatus(Invoice.InvoiceStatus.PAID);
        return invoiceRepository.save(invoice);
    }
}
