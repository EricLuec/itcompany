package el.itcompany.controller;

import el.itcompany.entities.building.Building;
import el.itcompany.services.BuildingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/building")
@RequiredArgsConstructor
public class BuildingController {

    private final BuildingService buildingService;

    @GetMapping("/create")
    public String createBuilding(Building building) {
        buildingService.newBuilding(building);
        return "redirect:/";
    }
}
