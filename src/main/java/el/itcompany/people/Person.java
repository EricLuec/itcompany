package el.itcompany.people;

import java.util.ArrayList;

public interface Person {

    boolean isOpenForWork();
    String reportPerson(String message);
    Manager getManager();
    void listItemsInPosession();
}
