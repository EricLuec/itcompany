package el.itcompany.services;

import el.itcompany.entities.people.Person;
import el.itcompany.repositories.PeopleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService {
    @Autowired
    private PeopleRepository peopleRepository;

    public void newPerson(Person person) {
        this.peopleRepository.save(person);
    }
}
