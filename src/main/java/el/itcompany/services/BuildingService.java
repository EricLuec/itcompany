package el.itcompany.services;

import el.itcompany.entities.building.DefaultBuilding;
import el.itcompany.repositories.BuildingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BuildingService {
    private final BuildingRepository buildingRepository;

    public void newBuilding(DefaultBuilding building) {
        this.buildingRepository.save(building);
    }
    public List<DefaultBuilding> findAll() {
        return this.buildingRepository.findAll();
    }
}
