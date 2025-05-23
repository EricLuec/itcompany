package el.itcompany.services;

import el.itcompany.entities.sectors.DefaultSector;
import el.itcompany.repositories.SectorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SectorService implements DefaultSector {
    @Autowired
    private SectorRepository sectorRepository;

    public void newSector(DefaultSector sector) {
        this.sectorRepository.save(sector);
    }

}
