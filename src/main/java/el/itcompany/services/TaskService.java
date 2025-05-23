package el.itcompany.services;

import el.itcompany.entities.tasks.Task;
import el.itcompany.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskrepository;

    public void newTask(Task task) {
        this.taskrepository.save(task);
    }
}
