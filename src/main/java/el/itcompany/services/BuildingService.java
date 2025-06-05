package el.itcompany.services;

import el.itcompany.entities.building.Building;
import el.itcompany.repositories.BuildingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BuildingService {
    private final BuildingRepository buildingRepository;

    public void newBuilding(Building building) {
        this.buildingRepository.save(building);
    }
    public List<Building> findAll() {
        return this.buildingRepository.findAll();
    }
}
