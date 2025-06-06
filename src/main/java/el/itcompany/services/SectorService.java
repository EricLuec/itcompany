package el.itcompany.services;

import el.itcompany.entities.sectors.Sector;
import el.itcompany.repositories.SectorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SectorService {
    private final SectorRepository sectorRepository;

    public void newSector(Sector sector) {
        this.sectorRepository.save(sector);
    }
    public List<Sector> findAll() {
        return sectorRepository.findAll();
    }

}
