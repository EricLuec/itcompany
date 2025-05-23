package el.itcompany.repositories;

import el.itcompany.entities.building.DefaultBuilding;
import el.itcompany.entities.sectors.DefaultSector;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SectorRepository extends JpaRepository<DefaultSector, Long> {
}
