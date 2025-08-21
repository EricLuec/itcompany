package el.itcompany.controllers;

import el.itcompany.entities.Sector;
import el.itcompany.services.SectorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sectors")
public class SectorController {

    private final SectorService sectorService;

    public SectorController(SectorService sectorService) {
        this.sectorService = sectorService;
    }

    @GetMapping
    public List<Sector> getAllSectors() {
        return sectorService.getAllSectors();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sector> getSectorById(@PathVariable Long id) {
        return sectorService.getSectorById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Sector createSector(@RequestBody Sector sector) {
        return sectorService.createSector(sector);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sector> updateSector(@PathVariable Long id, @RequestBody Sector sector) {
        try {
            return ResponseEntity.ok(sectorService.updateSector(id, sector));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSector(@PathVariable Long id) {
        sectorService.deleteSector(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/allIds")
    public ResponseEntity<List<Long>> getAllSectorIds() {
        List<Long> sectorIds = sectorService.getAllSectorIds();

        return ResponseEntity.ok(sectorIds);
    }
}