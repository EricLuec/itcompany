package el.itcompany.repositories;

import el.itcompany.entities.people.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PeopleRepository extends JpaRepository<Person, Long> {
}
