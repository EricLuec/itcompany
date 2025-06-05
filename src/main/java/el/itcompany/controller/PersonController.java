package el.itcompany.controller;

import el.itcompany.entities.people.Person;
import el.itcompany.services.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/people")
@RequiredArgsConstructor
public class PersonController {
    private final PersonService personService;

    @GetMapping
    public String listPeople() {
        List<Person> employees = personService.findAll();
        return employees.toString();
    }

}
