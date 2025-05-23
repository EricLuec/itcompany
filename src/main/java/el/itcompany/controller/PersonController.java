package el.itcompany.controller;

import el.itcompany.entities.people.Person;
import el.itcompany.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

@Controller
public class PersonController {
    @Autowired
    private PersonService personService;

    @GetMapping("/person/create")
    public String newPerson(@ModelAttribute("person") Person person) {
        personService.newPerson(person);
        return "redirect:/";
    }
}
