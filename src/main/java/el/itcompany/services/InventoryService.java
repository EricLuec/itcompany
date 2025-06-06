package el.itcompany.services;

import el.itcompany.entities.Project;
import el.itcompany.repositories.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public Project updateProject(Long id, Project projectDetails) {
        return projectRepository.findById(id)
                .map(project -> {
                    project.setName(projectDetails.getName());
                    //project.setStartDate(projectDetails.getStartDate());
                    //project.setEndDate(projectDetails.getEndDate());
                    //project.setBudget(projectDetails.getBudget());
                    // project.setStatus(projectDetails.getStatus());
                    // project.setCustomer(projectDetails.getCustomer());
                    // project.setEmployees(projectDetails.getEmployees());
                    return projectRepository.save(project);
                })
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

}