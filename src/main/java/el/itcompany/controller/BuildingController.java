package el.itcompany.controller;

import el.itcompany.entities.building.DefaultBuilding;
import el.itcompany.services.BuildingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

@Controller
public class BuildingController {

    @Autowired
    private BuildingService buildingService;

    @GetMapping("/building/create")
    public String createBuilding(@ModelAttribute("building") DefaultBuilding building) {
        buildingService.newBuilding(building);
        return "redirect:/";
    }
}
