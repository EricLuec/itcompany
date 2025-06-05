package el.itcompany.controller;

import el.itcompany.entities.people.Person;
import el.itcompany.entities.sectors.DefaultSector;
import el.itcompany.services.SectorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/sector")
@RequiredArgsConstructor
public class SectorController {
    private final SectorService sectorService;

    @GetMapping
    public String listPeople() {
        List<DefaultSector> employees = sectorService.findAll();
        return employees.toString();
    }
}
