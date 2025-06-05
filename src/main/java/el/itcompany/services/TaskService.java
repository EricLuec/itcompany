package el.itcompany.services;

import el.itcompany.entities.tasks.Task;
import el.itcompany.repositories.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class TaskService {
    private final TaskRepository taskrepository;

    public void newTask(Task task) {
        this.taskrepository.save(task);
    }

    public List<Task> findAll() {
        return taskrepository.findAll();
    }
}
