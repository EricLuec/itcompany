package el.itcompany.services;

import el.itcompany.entities.Employee;
import el.itcompany.repositories.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public Employee createEmployee(Employee inventory) {
        return employeeRepository.save(inventory);
    }

    public Employee updateEmployee(Long id, Employee employeeDetails) {
        return employeeRepository.findById(id)
                .map(employee -> {
                    employee.setFirstName(employeeDetails.getFirstName());
                    employee.setLastName(employeeDetails.getLastName());
                    employee.setEmail(employeeDetails.getEmail());
                    employee.setSalary(employeeDetails.getSalary());
                    employee.setHireDate(employeeDetails.getHireDate());
                    employee.setManager(employeeDetails.getManager());

                    return employeeRepository.save(employee);
                })
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

}