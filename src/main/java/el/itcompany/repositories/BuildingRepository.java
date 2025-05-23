package el.itcompany.repositories;

import el.itcompany.entities.building.DefaultBuilding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuildingRepository extends JpaRepository<DefaultBuilding, Long> {
}
