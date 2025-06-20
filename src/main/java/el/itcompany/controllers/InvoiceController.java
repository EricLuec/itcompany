package el.itcompany.controllers;

import el.itcompany.entities.Invoice;
import el.itcompany.services.InvoiceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/invoices")
public class InvoiceController {

    private final InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @GetMapping
    public List<Invoice> getAllInvoices() {
        return invoiceService.getAllInvoices();
    }

    @GetMapping("/{id}")
    public Invoice getInvoiceById(@PathVariable Long id) {
        return invoiceService.getInvoiceById(id);
    }

    @GetMapping("/budget/{budgetId}")
    public List<Invoice> getInvoicesByBudget(@PathVariable Long budgetId) {
        return invoiceService.getInvoicesByBudget(budgetId);
    }

    @PostMapping("/budget/{budgetId}")
    public Invoice createInvoice(@RequestBody Invoice invoice, @PathVariable Long budgetId) {
        return invoiceService.createInvoice(invoice, budgetId);
    }

    @PutMapping("/{id}")
    public Invoice updateInvoice(@PathVariable Long id, @RequestBody Invoice invoice) {
        return invoiceService.updateInvoice(id, invoice);
    }

    @DeleteMapping("/{id}")
    public void deleteInvoice(@PathVariable Long id) {
        invoiceService.deleteInvoice(id);
    }
}
