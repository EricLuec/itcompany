package el.itcompany.services;

import el.itcompany.entities.sectors.DefaultSector;
import el.itcompany.repositories.SectorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SectorService {
    private final SectorRepository sectorRepository;

    public void newSector(DefaultSector sector) {
        this.sectorRepository.save(sector);
    }
    public List<DefaultSector> findAll() {
        return sectorRepository.findAll();
    }

}
