package el.itcompany.controller;

import el.itcompany.entities.inventory.Inventory;
import el.itcompany.entities.position.Position;
import el.itcompany.services.PositionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/position")
@RequiredArgsConstructor
public class PositionController {
    private final PositionService positionService;

    @GetMapping
    public List<Position> listPositions() {
        return positionService.findAll().stream().toList();
    }

    @PostMapping("/new")
    public String saveEmployee(Position position) {
        positionService.newPosition(position);
        return "redirect:/";
    }
}
