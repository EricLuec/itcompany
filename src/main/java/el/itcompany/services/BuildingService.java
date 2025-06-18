package el.itcompany.services;

import el.itcompany.entities.Building;
import el.itcompany.entities.Sector;
import el.itcompany.repositories.BuildingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BuildingService {

    private final BuildingRepository buildingRepository;

    public List<Building> getAllBuildings() {
        return buildingRepository.findAll();
    }

    public Optional<Building> getBuildingById(Long id) {
        return buildingRepository.findById(id);
    }

    public Building createBuilding(Building building) {
        return buildingRepository.save(building);
    }

    public Building updateBuilding(Long id, Building buildingDetails) {
        return buildingRepository.findById(id)
                .map(building -> {
                    building.setName(buildingDetails.getName());
                    //project.setStartDate(projectDetails.getStartDate());
                    //project.setEndDate(projectDetails.getEndDate());
                    //project.setBudget(projectDetails.getBudget());
                    // project.setStatus(projectDetails.getStatus());
                    // project.setCustomer(projectDetails.getCustomer());
                    // project.setEmployees(projectDetails.getEmployees());
                    return buildingRepository.save(building);
                })
                .orElseThrow(() -> new RuntimeException("Building not found"));
    }

    public void deleteBuilding(Long id) {
        buildingRepository.deleteById(id);
    }

    public Building addSectorToBuilding(Long id, Sector sector) {
        return buildingRepository.findById(id).map(building -> {
            building.getSectorList().add(sector);
            return buildingRepository.save(building);
        }).orElseThrow(() -> new RuntimeException("Sector or Building not found"));
    }

    public Building removeSectorFromBuilding(Long id, Sector sector) {
        return buildingRepository.findById(id).map(building -> {
            building.getSectorList().remove(sector);
            return buildingRepository.save(building);
        }).orElseThrow(() -> new RuntimeException("Sector or Building not found"));
    }
}