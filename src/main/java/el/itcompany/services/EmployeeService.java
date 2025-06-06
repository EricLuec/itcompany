package el.itcompany.services;

import el.itcompany.entities.people.Person;
import el.itcompany.repositories.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class PersonService {
    private final EmployeeRepository peopleRepository;

    public void newPerson(Person person) {
        this.peopleRepository.save(person);
    }
    public List<Person> findAll() {
        return this.peopleRepository.findAll();
    }
}
