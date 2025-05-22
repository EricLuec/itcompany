package el.itcompany.people;

import java.util.ArrayList;

public interface Person {
    ArrayList<String> complaints = new ArrayList<>();

    boolean isOpenForWork();
    String reportPerson(String message, Person person);
    Manager getManager();
    boolean listItemsInPosession(Person person);
}
