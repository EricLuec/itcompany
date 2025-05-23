package el.itcompany.entities.people;

public interface Person {

    boolean isOpenForWork();
    String reportPerson(String message);
    Manager getManager();
    void listItemsInPosession();
}
