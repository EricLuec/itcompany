package el.itcompany.services;

import el.itcompany.entities.Sector;
import el.itcompany.repositories.SectorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SectorService {

    private final SectorRepository sectorRepository;

    public List<Sector> getAllSectors() {
        return sectorRepository.findAll();
    }

    public Optional<Sector> getSectorById(Long id) {
        return sectorRepository.findById(id);
    }

    public Sector createSector(Sector sector) {
        return sectorRepository.save(sector);
    }

    public Sector updateSector(Long id, Sector sectorDetails) {
        return sectorRepository.findById(id)
                .map(sector -> {
                    sector.setName(sectorDetails.getName());
                    //project.setStartDate(projectDetails.getStartDate());
                    //project.setEndDate(projectDetails.getEndDate());
                    //project.setBudget(projectDetails.getBudget());
                    // project.setStatus(projectDetails.getStatus());
                    // project.setCustomer(projectDetails.getCustomer());
                    // project.setEmployees(projectDetails.getEmployees());
                    return sectorRepository.save(sector);
                })
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }

    public void deleteSector(Long id) {
        sectorRepository.deleteById(id);
    }

}