package el.itcompany.controller;

import el.itcompany.entities.people.Person;
import el.itcompany.services.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/people")
@RequiredArgsConstructor
public class PersonController {
    private final EmployeeService personService;

    @GetMapping
    public String listPeople() {
        List<Person> employees = personService.findAll();
        return employees.toString();
    }

}
