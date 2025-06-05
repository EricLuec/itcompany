package el.itcompany.services;

import el.itcompany.entities.people.Person;
import el.itcompany.repositories.PeopleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class PersonService {
    private final PeopleRepository peopleRepository;

    public void newPerson(Person person) {
        this.peopleRepository.save(person);
    }
    public List<Person> findAll() {
        return this.peopleRepository.findAll();
    }
}
