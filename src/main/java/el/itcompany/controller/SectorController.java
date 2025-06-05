package el.itcompany.controller;

import el.itcompany.services.SectorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/sector")
@RequiredArgsConstructor
public class SectorController {
    private final SectorService sectorService;
}
