package el.itcompany.services;

import el.itcompany.entities.building.DefaultBuilding;
import el.itcompany.repositories.BuildingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BuildingService {
    @Autowired
    private BuildingRepository buildingRepository;

    public void newBuilding(DefaultBuilding building) {
        this.buildingRepository.save(building);
    }
}
