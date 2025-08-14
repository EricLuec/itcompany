'use client';

import CreateInvoiceForm from './NewInvoicePage';
import { BudgetProvider } from '@/context/CompanyBudgetContext';

export default function NewInvoicePage() {
    return (
        <BudgetProvider>
            <CreateInvoiceForm />
        </BudgetProvider>
    );
}